import { useContext } from 'react'
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Events from './pages/events';
import Home from './pages/home';
import LandingPage from './pages/landing';
import Login from './pages/login';
import BookDetails from './pages/book-details';
import Books from './pages/books';
import Register from './pages/register';

// import UserContext from './Context'

const Navigation = (props) => {
    //   const context = useContext(UserContext)
    //   const loggedIn = context.user && context.user.loggedIn
    const loggedIn = '';

    return (
        <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/books" exact component={Books} />
            <Route path="/books/:id" component={BookDetails} />
            <Route path="/events" exact component={Events} />

            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>

                {/* {loggedIn ? (<Redirect to="/" />) : (<Register  props={props}/>)} */}
            {/* </Route> */}
            <Route path="/login">
                {loggedIn ? (<Redirect to="/" />) : (<Login />)}
            </Route>
            {/* <Route path="/profile/:userid">
                {loggedIn ? (<ProfilePage />) : (<Redirect to="/login" />)}
            </Route>
            <Route component={ErrorPage} /> */}
        </Switch>
    )
}

export default Navigation