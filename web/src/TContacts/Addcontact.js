// import React, { Component } from "react";
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler,MDBRow,MDBCol, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask,MDBCard,MDBCardBody, MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,MDBInput } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid } from "@material-ui/core";
//import { Link } from 'react-router';

import Container from '@material-ui/core/Container';

export default function Addcontact() {
  //const [show, setShow] = useState(true);
  // const classes = useStyles();

      
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email_address, setEmail] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [address, setAddress] = useState("");
    const [relationship, setRelationship] = useState("");

    useEffect(() => {
      console.log('ridmiiiiiiiiiiiiiiiiiiiiiiiiiiii')
      if(!localStorage.getItem("key")){
        console.log('rrrrrrrrrrrrrrrrrrrrr')
      }  
    });
  
    function validateForm() {
      return email_address.length > 0  && first_name.length > 0 && last_name.length > 0 && phone_number.length == 10 && address.length > 0 && relationship.length>0
    }

    function handleSubmit(event) {

      const token = localStorage.getItem("key");
      const id = localStorage.getItem("user_id");

      fetch("http://localhost:3000/contact/createContact",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : "Bearer"+token,
      },
      body: JSON.stringify({
        email_address : email_address,
        first_name: first_name,
        last_name: last_name,
        address: address,
        phone_number: phone_number,
        relationship: relationship,
      })

    })
    .then(function(response) {
      
      if(response.status == 201){
        console.log('done')
        // alert(
        //   "Registration Success",
        //   "You are now member of guardian",
        //   [
        //     { text: "OK", onPress: _onLogin() }
        //   ]
        // )
      }
      else if(response.status == 409){
        // alert(
        //   "Registration Failed!",
        //   "Email is already used",
        //   [
        //     { text: "OK",onPress: _onAlert()  }
        //   ]
        // )
      } 
      else{
        return response;
      }

    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('Request succeeded with JSON response:', json);
    }).catch(function(error) {
      console.log('Request failed:', error);
    });

      event.preventDefault();
    }

    // _onLogin = () => {
    //   console.log('logged')
    // }

    // _onAlert = () => {
    //   console.log('alert')
    // }

  return (
    <Container>
    <div>
                <Router>
                    <header>
                    <MDBView src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
          
                        <MDBMask overlay="black-strong " className="  flex-center flex-column text-white text-center">
                           
                        <MDBContainer max-width="600px" min-width="320px" width="100%" padding="15px">
                        <MDBRow md="6">
                          <MDBCol md="6" padding="15px">
                            <MDBCard>
                              <MDBCardBody>
                              
                                <form>
                                <br/>
                                  <p className="h4 text-center py-4">Submit Trusted Contacts Details</p>
                                  <div className="grey-text">
                                    <MDBInput
                                      label="First name"
                                      icon="user"
                                      group
                                      type="text"
                                      validate
                                      error="wrong"
                                      success="right"
                                    />
                                    <MDBInput
                                      label="Last name"
                                      icon="user"
                                      group
                                      type="text"
                                      validate
                                      error="wrong"
                                      success="right"
                                    />
                                    <MDBInput
                                      label="Your email"
                                      icon="envelope"
                                      group
                                      type="email"
                                      validate
                                      error="wrong"
                                      success="right"
                                    />
                                    <MDBInput
                                      label="Address"
                                      icon="home"
                                      group
                                      type="text"
                                      validate
                                      error="wrong"
                                      success="right"
                                    />
                                    <MDBInput
                                      label="Phone number"
                                      icon="phone"
                                      group
                                      type="tel"
                                      validate
                                      error="wrong"
                                      success="right"
                                    />
                                    <MDBInput
                                      label="Relationship"
                                      icon="user"
                                      group
                                      type="text"
                                      validate
                                      error="wrong"
                                      success="right"
                                    />
                                  </div>
                                  <div className="text-center py-4 mt-3">
                                    <MDBBtn color="cyan" type="submit">
                                      Submit
                                    </MDBBtn>
                                  </div>
                                </form>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        </MDBRow>
                      </MDBContainer>
                        </MDBMask>
           
                    </MDBView>
                    </header>
                    </Router>
                    <main>
                        <MDBContainer className="text-center my-5">
                        <h2>
                            Make sure your child is safe !
                        </h2>
                        <h5>
                        Real-Time Location Tracking Solution for Child safety 
                        </h5>
                        </MDBContainer>
                    </main>
            </div>
            </Container>
  );
}






// class Contacts extends React.Component{


  
    


//     render(){
//         return(
//             <div>
//                 <Router>
//                     <header>
//                     <MDBView src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
          
//                         <MDBMask overlay="black-strong " className="  flex-center flex-column text-white text-center">
                           
//                         <MDBContainer max-width="600px" min-width="320px" width="100%" padding="15px">
//                         <MDBRow md="6">
//                           <MDBCol md="6" padding="15px">
//                             <MDBCard>
//                               <MDBCardBody>
//                                 <form>
//                                 <br/>
//                                   <p className="h4 text-center py-4">Submit Trusted Contacts Details</p>
//                                   <div className="grey-text">
//                                     <MDBInput
//                                       label="First name"
//                                       icon="user"
//                                       group
//                                       type="text"
//                                       validate
//                                       error="wrong"
//                                       success="right"
//                                     />
//                                     <MDBInput
//                                       label="Last name"
//                                       icon="user"
//                                       group
//                                       type="text"
//                                       validate
//                                       error="wrong"
//                                       success="right"
//                                     />
//                                     <MDBInput
//                                       label="Your email"
//                                       icon="envelope"
//                                       group
//                                       type="email"
//                                       validate
//                                       error="wrong"
//                                       success="right"
//                                     />
//                                     <MDBInput
//                                       label="Address"
//                                       icon="home"
//                                       group
//                                       type="text"
//                                       validate
//                                       error="wrong"
//                                       success="right"
//                                     />
//                                     <MDBInput
//                                       label="Phone number"
//                                       icon="phone"
//                                       group
//                                       type="tel"
//                                       validate
//                                       error="wrong"
//                                       success="right"
//                                     />
//                                     <MDBInput
//                                       label="Relationship"
//                                       icon="user"
//                                       group
//                                       type="text"
//                                       validate
//                                       error="wrong"
//                                       success="right"
//                                     />
//                                   </div>
//                                   <div className="text-center py-4 mt-3">
//                                     <MDBBtn color="cyan" type="submit">
//                                       Submit
//                                     </MDBBtn>
//                                   </div>
//                                 </form>
//                               </MDBCardBody>
//                             </MDBCard>
//                           </MDBCol>
//                         </MDBRow>
//                       </MDBContainer>
//                         </MDBMask>
           
//                     </MDBView>
//                     </header>
//                     </Router>
//                     <main>
//                         <MDBContainer className="text-center my-5">
//                         <h2>
//                             Make sure your child is safe !
//                         </h2>
//                         <h5>
//                         Real-Time Location Tracking Solution for Child safety 
//                         </h5>
//                         </MDBContainer>
//                     </main>
//             </div>
//         );

//     }
// }



// export default Contacts;