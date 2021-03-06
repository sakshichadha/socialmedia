import {React,Fragment} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
const NavBar=({auth:{isAuthenticated,loading},logout})=>{
const authLinks=(
  <ul>
    <li><Link to='/profiles'>Profiles</Link></li>
    <li><Link to='/ShowRequests'>Requests</Link></li>
    <li><Link to='/posts'>Posts</Link></li>
      <li><Link to="/dashboard"><i className='fas fa-user'/>{''}
      Dashboard</Link></li>
      <a onClick={logout} href='#!'><i className='fas fa-sign-out-alt'/>{''}<span className='hide-sm'>LOGOUT</span></a>

      </ul>
);
const guestLinks=(
  <ul>
    <li><Link to='/profiles'>Profiles</Link></li>
  <li><Link to="/register">Register</Link></li>
  <li><Link to="/login">Login</Link></li>
</ul>
);
return (
  <nav className='navbar bg-dark'>
    <h1> <Link to='/'>
      <i className='fas fa-code'/>Hyper Tribe
      </Link></h1>
      {!loading && <Fragment >{isAuthenticated?authLinks:guestLinks}</Fragment>
        }
   </nav>


);
};

NavBar.propTypes={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired

};
const mapStateToProps=state=>({
  auth:state.auth
});

export default connect(mapStateToProps,{logout})(NavBar);