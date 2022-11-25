import React,{useState,useEffect} from 'react';
import {Route,Routes,Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Books from './components/books/Books';
import Addbook from './components/Addbook';
import Contact from './components/Contact';
import About from './components/About';
import Home from './components/Home';
import Auth from './components/Auth/Auth';
import BookDetails from './components/BookDetails';

function App() {
  const [currentId, setCurrentId] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
     setUser(JSON.parse(localStorage.getItem('profile')));
  }, [])
  

  return (
    <>
    <div>
      <Navbar />
    </div>
    <div>
      <Routes>
        <Route path='/' element={<Home />}exact />
        <Route path='/books' element={<Navigate to='/books/books' />}exact />
        <Route path='/books/books' element={<Books setCurrentId={setCurrentId}/>} />
        <Route path='/books/books/search' element={<Books setCurrentId={setCurrentId}/>} />
        <Route path='/books/books/:id' element={<BookDetails />} />
        <Route path='/add' element={<Addbook currentId={currentId} setCurrentId={setCurrentId}/>}exact />
        <Route path='/contacts' element={<Contact />}exact />
        <Route path='/about' element={<About />}exact />
        <Route path='/auth' element={<Auth />}exact />
      </Routes>
    </div>
    </>
  );
}

export default App;
