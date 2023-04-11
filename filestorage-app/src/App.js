import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import FileUploadForm from './pages/FileUploadPage.jsx';
import HomePage from './pages/HomePage.jsx'
import RetreiveFile from './pages/RetreiveFile.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossOrigin="anonymous"></script>
    </head>
    <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route path="/upload" element={<FileUploadForm />}/>
          <Route path="/retreive" element={<RetreiveFile />}/>
        </Routes>
    </Router>
    </div>
  );               
}

export default App;
