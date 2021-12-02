import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import AuthContext from './context/authContext';
import BookCreate from './pages/book-create';
import BookDetails from './pages/book-details';
import Books from './pages/books';
import Events from './pages/events';
import Home from './pages/home';
import Landing from './pages/landing';
import Login from './pages/login';
import Logout from './pages/logout';
import Register from './pages/register';


const App = () => {
  const { user } = useContext(AuthContext)
  const loggedIn = user.username;
  console.log(user);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:bookId" element={<BookDetails />} />
      <Route path="/books/create" element={<BookCreate />} />
      <Route path="/events" element={<Events />} />

      {/* <Route path="/register" element={<Register/>} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={loggedIn?(<Navigate to="/home" />): <Register/>}/>
    </Routes>
  );
}

export default App;
