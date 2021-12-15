import { useContext } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import AuthContext from './context/authContext';
import GuardedRoute from './GuardedRoute';
import BookCreate from './pages/book-create';
import BookDetails from './pages/book-details';
import BookEdit from './pages/book-edit';
import Books from './pages/books';
import Events from './pages/events';
import Home from './pages/home';
import Landing from './pages/landing';
import Login from './pages/login';
import Logout from './pages/logout';
import MyPage from './pages/my-page';
import NoMatch from './pages/no-match';
import Register from './pages/register';


const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:bookId" element={<BookDetails />} />
      <Route element={<GuardedRoute path={"/login"} />}>
        <Route path="/books/:bookId/edit" element={<BookEdit />} />
        <Route path="/books/create" element={<BookCreate />} />
      </Route>
      <Route path="/events" element={<Events />} />

      <Route path="/my-page/:userId" element={<MyPage />} />
      <Route element={<GuardedRoute path={"/home"} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<GuardedRoute path={"/login"} />}>
        <Route path="/logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
