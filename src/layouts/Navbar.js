import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler,MDBRow,MDBCol, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask,MDBCard,MDBCardBody, MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,MDBInput } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class FullPageIntroWithNonFixedNavbar extends React.Component {
    //function  FullPageIntroWithNonFixedNavbar(){
      constructor(props) {
        super(props);
        this.state = {
          collapse: false,
          isWideEnough: false,
        };
        this.onClick = this.onClick.bind(this);
      }
    
      onClick() {
        this.setState({
          collapse: !this.state.collapse,
        });
      }

      render() {
    return(
      
            <MDBNavbar color="black" fixed="top" dark expand="md">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            {/* <img src="D:/new guardian/guardian-web/public/Guardian Logo.png" className="rounded float-left" alt="aligment" /> */}
                        </MDBCol>
                    </MDBRow>
                    <MDBNavbarBrand href="/">
                      <strong>Guardian</strong>
                    </MDBNavbarBrand>
                    
                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>
                      <MDBNavbarNav left>
                        <MDBNavItem >
                          <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem >
                          <MDBNavLink to="/about">About Us</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                          <MDBNavLink to="/contact">Contacts</MDBNavLink>
                        </MDBNavItem>
                      </MDBNavbarNav>
                      <MDBNavbarNav right>
                        <MDBNavItem active>
                        <MDBNavLink to="#">Sign Up</MDBNavLink> 
                        </MDBNavItem>
                        <MDBNavItem active>
                        <MDBNavLink to="#">Login</MDBNavLink> 
                        </MDBNavItem>
                      </MDBNavbarNav>
                    </MDBCollapse>
                  </MDBContainer>
                </MDBNavbar>
                
  
    

            
    );
}
}
export default FullPageIntroWithNonFixedNavbar;