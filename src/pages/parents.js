import React, { Component } from 'react';

import {Link} from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler,MDBRow,MDBCol, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask,MDBCard,MDBCardBody, MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,MDBInput } from 'mdbreact';

import Table from 'react-bootstrap/Table';

class parents extends Component{

  constructor(props){

    super(props);

    this.state={

      items:[],

      isLoaded:false,

    }
  }


  componentDidMount(){

    var remember=localStorage.getItem('key');

    const requestOptions = {


      method: 'GET',

      headers: { 
        "Accept": "application/json",
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+remember,
      },


    };

    fetch('http://localhost:3000/parents', requestOptions)

    .then(res => res.json())

    .then(json => {

      this.setState({

        isLoaded: true,

        items:json,


        firstName:json[0].first_name

      })

    });
  }

  render(){
    var { isLoaded, firstName, items }= this.state;
      return(
        <div className="parents">
      {/* <h1>data is loaded role is {firstName}</h1> */}



          {/* <Table striped bordered hover variant="dark" responsive="sm">

            <thead>

              <tr>

                <th>User Id</th>
    var { isLoaded, firstName, items }= this.state;

  

                <th>Email Address</th>

                <th>First Name</th>

                <th>Last Name</th>

                <th>Phone Number</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

            { this.state.items.map((item, index) => (

          <tr key={index}>

        <div className="parents"> */}
         
      {/* <h1>data is loaded role is {firstName}</h1> */}

      <Router>
                    <header>
                    <MDBView src="https://cdn.hipwallpaper.com/i/95/98/mR7Bkc.jpg">
          
                        <MDBMask overlay="strong " className="  flex-center flex-column text-white text-center">
                          
                        <h2>Users</h2>
                        <Link className="btn pos-right btn-outline-primary " to={'/addParent'}>Add Parent</Link>
                           <table class="table border shadow" >
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email Address</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Address</th>
      <th >Action</th>
    </tr>
  </thead>
  <tbody>
  { this.state.items.map((item, index) => (
    <tr key={index}>
      <th scope="row">1</th>
      <td>{item.user_id}</td>
      <td>{item.email_address}</td>
      <td>{item.first_name}</td>
      <td>{item.last_name}</td>
      <td>{item.phone_number}</td>
      
      <td>
            <Link class="btn btn-primary mr-2">View</Link>
            <Link class="btn btn-outline-primary mr-2">Update</Link>
            <Link class="btn btn-danger mr-2">Delete</Link>
      
      </td>
    </tr>

))}
    
    
  </tbody>
</table>



                        </MDBMask>
           
                    </MDBView>
                    </header>
                    </Router>

      

        
  
        </div>

      );


          //   <td>{item.user_id}</td>

          //   <td>{item.email_address}</td>

          //   <td>{item.first_name}</td>

          //   <td>{item.last_name}</td>

          //   <td>{item.phone_number}</td>

          //     </tr>   

          // ))}
          //   </tbody>

          // </Table>
        //</div>
    //);
  }
}
 



const tableStyle = {
  margin: "40px",
  border: "5px solid pink",
  fontSize: "15px",
}

export default parents;