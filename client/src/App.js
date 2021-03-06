
import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import NavBar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/alert';
import {Provider} from 'react-redux';
import {loadUser} from  './actions/auth';
import setAuthToken from './utils/setAuthToken'
import store from './store';
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import PrivateRoute from './components/routing/PrivateRoute'
import Profiles from './components/profiles/Profiles'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import Profile from './components/profile/Profile'
import ShowRequests from './components/profiles/ShowRequests'
console.log("yoo");
//console.log(localStorage);
//console.log("ABCDEFFFFFF"+localStorage.token);
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    // check for token in LS
  
    store.dispatch(loadUser())
    
},[]);
    // log user out from all tabs if they log out in one tab
    
  return(
 
  <Provider store={store}>
    <Router>
    <Fragment>
      <NavBar/>
      <Route exact path='/' component ={Landing}/>
      <section className="container">
        <Alert/>
        <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profiles" component={Profiles}/>
        <Route exact path="/profile/:id" component={Profile}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
        <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
        <PrivateRoute exact path="/posts" component={Posts}/>
        <PrivateRoute exact path="/posts/:id" component={Post}/>
        <PrivateRoute exact path="/ShowRequests" component={ShowRequests}/>


          </Switch>
        </section>
    </Fragment>
    </Router>
    </Provider>
  
  )
};

export default App;
