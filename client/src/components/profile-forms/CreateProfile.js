import React,{Fragment,useState} from 'react'
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {createProfile} from '../../actions/profile'
const  CreateProfile=({createProfile,history})=>{
    const [formData,setFormData]=useState({
       location:'',
       status:'',
       bio:'',
     });
    const {
        location,
        status,
        bio

    } =formData;
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit=e=>{
        e.preventDefault();
        createProfile(formData,history);
    }
    return (
        <Fragment>
             <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
       
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          
        </div>
        <div className="form-group">
         
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location"  value={location} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          
        </div>
        <div className="form-group">
         
          
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e=>onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        

      

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" onChange={e=>onChange(e)} />
        </div>

        

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" onChange={e=>onChange(e)} />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
       
      </form>

        </Fragment>

    )
}
CreateProfile.propTypes={
    createProfile:PropTypes.func.isRequired
}

export default connect(null,{createProfile})(withRouter(CreateProfile))