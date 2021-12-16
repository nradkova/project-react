import { Route, Routes } from 'react-router-dom';

import './App.css';

import  AuthRoute from './GuardedRoute';

import Home from './pages/home';
import Books from './pages/books';
import Login from './pages/login';
import Logout from './pages/logout';
import Events from './pages/events';
import MyPage from './pages/my-page';
import Landing from './pages/landing';
import NoMatch from './pages/no-match';
import Register from './pages/register';
import BookEdit from './pages/book-edit';
import BookCreate from './pages/book-create';
import EventCreate from './pages/event-create';
import BookDetails from './pages/book-details';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:bookId" element={<BookDetails />} />
      <Route element={<AuthRoute />}>
        <Route path="/books/:bookId/edit" element={<BookEdit />} />
        <Route path="/books/create" element={<BookCreate />} />
      </Route>

      <Route path="/events" element={<Events />} />
      <Route path="/events/create" element={<EventCreate />} />

      <Route path="/my-page/:userId" element={<MyPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AuthRoute />}>
        <Route path="/logout" element={<Logout />} />
      </Route>
      
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
