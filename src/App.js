import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import AuthContext from './context/authContext';
import BookDetails from './pages/book-details';
import Books from './pages/books';
import Events from './pages/events';
import Home from './pages/home';
import Landing from './pages/landing';
import Login from './pages/login';
import Logout from './pages/logout';
import Register from './pages/register';


const App = () => {
  const{user}=useContext(AuthContext)
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/books" element={<Books/>} />
      <Route path="/books/:bookId" element={<BookDetails/>} />
      <Route path="/events" element={<Events/>} />

      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/logout" element={<Logout/>} />
       {/* <Route path="/register"> {loggedIn ? (<Redirect to="/home" />) : (<Register/>)} </Route>  */}
    </Routes>
  );
}

export default App;
