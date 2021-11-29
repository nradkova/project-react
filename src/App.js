import { Route, Switch } from 'react-router-dom';

import './App.css';
import BookDetails from './pages/book-details';
import Books from './pages/books';
import Events from './pages/events';
import Home from './pages/home';
import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/register';


const App = (props) => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/books" exact component={Books} />
      <Route path="/books/:id" component={BookDetails} />
      <Route path="/events" exact component={Events} />

      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
       {/* <Route path="/register"> {loggedIn ? (<Redirect to="/home" />) : (<Register/>)} </Route>  */}
    </Switch>
  );
}

export default App;
