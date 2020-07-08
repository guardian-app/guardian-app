import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler,MDBRow,MDBCol, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask,MDBCard,MDBCardBody, MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,MDBInput } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid } from "@material-ui/core";

class Contacts extends React.Component{
    


    render(){
        return(
            <div>
                <Router>
                    <header>
                    <MDBView src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
          
                        <MDBMask overlay="black-strong " className="  flex-center flex-column text-white text-center">
                           
                           <MDBContainer>
                           
                        <MDBRow >
                        <div className="mx-auto" >
                            <MDBCol md="600"  >
                           
                            <form>
                                
                                <p className="h5 text-center mb-4">Write to us</p>
                                <div className="grey-text">
                                <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                                    success="right" />
                                <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                                    success="right" />
                                <MDBInput label="Subject" icon="tag" group type="text" validate error="wrong" success="right" />
                                <MDBInput type="textarea" rows="2" label="Your message" icon="pencil-alt" />
                                </div>
                                <div className="text-center">
                                <MDBBtn outline color="secondary">
                                    Send
                                    <MDBIcon far icon="paper-plane" className="ml-1" />
                                </MDBBtn>
                                </div>
                            </form>
                            
                            </MDBCol> 
                            </div>
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
        );

    }
}



export default Contacts;