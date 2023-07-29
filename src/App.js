
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/about';
import Home from './components/home';
import Navbar from './components/navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/NoteState';

function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar />
      <div className="container">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
