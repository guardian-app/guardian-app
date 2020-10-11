import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler,MDBRow,MDBCol, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask,MDBCard,MDBCardBody, MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,MDBInput } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import {Link} from "react-router-dom";
import axios from 'axios';

class About extends React.Component{
    
  conponentDidMount() {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("key");
    axios.get("http://localhost:3000/contact/"+userId+"/getContactByParentId",{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : "Bearer"+token,
      }
    })
    .then((res) =>{
      const data = res.data;
      //me data tika array ekakata dala ara table eke print kragnna thiyenne dn
    }).catch((error)=> {
      console.warn('Internal error ',error);
    })
  }


    render(){
        return(
            <div>
                <Router>
                    <header>
                    <MDBView src="https://cdn.hipwallpaper.com/i/95/98/mR7Bkc.jpg">
          
                        <MDBMask overlay="strong " className="  flex-center flex-column text-white text-center">
                          
                        <h2>Users</h2>
                        <Link className="btn pos-right btn-outline-primary " to="/users/add">Add Trusted Contact</Link>
                           <table class="table border shadow" >
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email Address</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Address</th>
      <th scope="col">Relationship</th>
      <th >Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>678</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>123</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
      <td>789</td>
      <td>@mdo</td>
      <td>
            <Link class="btn btn-primary mr-2">View</Link>
            <Link class="btn btn-outline-primary mr-2">Update</Link>
            <Link class="btn btn-danger mr-2">Delete</Link>
      
      </td>
    </tr>
  </tbody>
</table>



                        </MDBMask>
           
                    </MDBView>
                    </header>
                    </Router>
                    
            </div>
        );

    }
}



export default About;