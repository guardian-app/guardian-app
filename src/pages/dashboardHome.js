import React from 'react';
import {  MDBMask,MDBCard,MDBCardBody, MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,MDBInput } from 'mdbreact';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router } from 'react-router-dom';
import {Link} from "react-router-dom";

import back from "./../assets/back.png";




function dashboardHome() {
    return (
        
        <div>
           
                <div className='home' style={container1}>
                <MDBMask overlay="black-strong " className="  flex-center flex-column text-white text-center">
                            <div className = "container2" style = {container2}>
                            
                            <h2 style = {h2}>You Have Signed in As Lakma</h2>
                        
                            <br/>
                            <Link to={'/parentss'}><Button style ={button} variant="outlined" color="primary">Parent</Button></Link>
                            <Link to={'/childrenn'}><Button style ={button} variant="outlined" color="primary">Children</Button></Link>
                            <Link to={'/report'}><Button style ={button} variant="outlined" color="primary">Reports</Button></Link>
                            <Link to={'/stat'}><Button style ={button} variant="outlined" color="primary">Statistics</Button></Link>
                            

  
                            
                            </div>
                            <div>
                            <img src={back}/>
                            </div>
                        </MDBMask>
 
                </div>
        </div>
    )
}

export default dashboardHome


const container1 = {

    backgroundColor: "#282c34", 

  };
  const container2 = {
    color : "#FFFFF",
    
    padding: "1px" 
  };

  const h2 = {

    fontFamily: "Arial",
    
    color : "#00b4d8",
    textAlign: "center" ,
    marginBottom: "15px" ,
    marginTop: "15px" ,

  };
  const button = {
    marginRight: "15px" ,
    color : "white",
  };