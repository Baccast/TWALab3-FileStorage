import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import FileUploadForm from './pages/FileUploadPage.jsx';
import HomePage from './pages/HomePage.jsx'
import RetrieveFile from './pages/RetrieveFile.jsx'
import DeleteFile from './pages/DeleteFilePage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossOrigin="anonymous"></script>
    </head>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">File Storage App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/upload">Upload</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/retrieve">Retrieve</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/delete">Delete</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route path="/upload" element={<FileUploadForm />}/>
          <Route path="/retrieve" element={<RetrieveFile />}/>
          <Route path="/delete" element={<DeleteFile />}/>
        </Routes>
    </Router>
    </div>
  );               
}

export default App;
