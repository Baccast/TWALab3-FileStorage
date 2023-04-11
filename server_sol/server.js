const express = require('express');
const multer = require('multer');   
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads will be stored in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const fileId = Date.now().toString(); // Generate a unique identifier for the file
    const filename = fileId + '-' + file.originalname; // Use the fileId in the filename
    cb(null, filename);
  }
});

const upload = multer({ storage }); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/upload', upload.single('file'), (req, res) => {
  const directory = `${__dirname}/uploads/`;

  // Extract the fileId from the filename generated by multer
  const fileId = req.file.filename.split('-')[0];

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).send('Upload failed. No file uploaded.');
  }

  // Get the total storage in MB in the uploads folder
  let totalSize = 0;
  fs.readdirSync(directory).forEach(file => {
    totalSize += fs.statSync(directory + file).size;
  });
  totalSize = totalSize / 1000000; // convert to MB

  // Check if the total storage in MB in the uploads folder + the new file size is less than or equal to 200 MB
  if (totalSize + (req.file.size / 1000000) > 200) {
    fs.unlinkSync(req.file.path); // delete the uploaded file
    return res.status(400).send('Upload failed. Total storage in uploads folder would exceed the limit of 200 MB.');
  }

  // Save the file information to a database or a file
  // Return the unique identifier to the client
  res.send(fileId);
});

// Retrieve a file
app.get('/retrieve/:fileId', (req, res) => {
  const fileId = req.params.fileId;
  const filePath = `${__dirname}/uploads/${fileId}`;

  // Check if the file exists
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      // File not found, send a 404 error
      res.status(404).send('File not found');
    } else {
      // File exists, send it to the client
      res.sendFile(filePath);
    }
  });
});

// Clear the storage
app.delete('/clear/:fileId', (req, res) => {
  const fileId = req.params.fileId;
  if (fileId && fileId !== 'all') {
    // Remove the file from the storage
    const filePath = `${__dirname}/uploads/${fileId}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to delete file');
      } else {
        res.send('File deleted');
      }
    });
  } else if (fileId === 'all') {
    // Clear all the files from the storage
    const directory = `${__dirname}/uploads/`;
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to read directory');
      } else {
        files.forEach((file) => {
          fs.unlinkSync(`${directory}${file}`);
        });
        res.send('All files deleted');
      }
    });
  } else {
    res.status(400).send('Invalid file ID');
  }
});

// Monitor the storage space
app.get('/monitor', (req, res) => {
  const directory = `${__dirname}/uploads/`;
  let numOfFiles = 0;
  let currentSpaceAllocated = 0;

  // Count the number of files in the storage and calculate the current space allocated to files
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to read directory');
    } else {
      numOfFiles = files.length;
      files.forEach((file) => {
        const stats = fs.statSync(`${directory}${file}`);
        currentSpaceAllocated += stats.size;
      });

      // Calculate the maximum space allowed (200 MB) and the percentage of space left to use
      const maxSpaceAllowed = 200000000;
      const percentageOfSpaceLeft = ((maxSpaceAllowed - currentSpaceAllocated) / maxSpaceAllowed) * 100;

      res.send({
        numOfFiles,
        maxSpaceAllowed,
        currentSpaceAllocated,
        percentageOfSpaceLeft
      });
    }
  });
});

const PORT = process.env.PORT || 8080;  
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});