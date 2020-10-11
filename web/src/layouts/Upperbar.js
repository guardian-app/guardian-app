import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler,MDBRow,MDBCol, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask,MDBCard,MDBCardBody, MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,MDBInput } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Update from "./../assets/updating.png";

class FullPageIntroWithNonFixedNavbar extends React.Component {
    
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
      <div>
      <Router>
      <header>
      
            <MDBNavbar color="black" fixed="top" dark expand="md">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            {/* <img src="D:/new guardian/guardian-web/public/Guardian Logo.png" className="rounded float-left" alt="aligment" /> */}
                        </MDBCol>
                    </MDBRow>
                    
                    
                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>
                      <MDBNavbarNav left>
                        
                      </MDBNavbarNav>
                      <MDBNavbarNav right>
                        <MDBNavItem >
                        <MDBNavLink exact to="/register"></MDBNavLink> 
                        </MDBNavItem>
                        <MDBNavItem >
                        <MDBNavLink styles={h1} exact to="/login"><img src={Update} /></MDBNavLink> 
                        </MDBNavItem>
                      </MDBNavbarNav>
                    </MDBCollapse>
                  </MDBContainer>
                </MDBNavbar>
                
                
                </header>
                </Router>
                </div>
            
    );
}
}
export default FullPageIntroWithNonFixedNavbar;

const h1 = {

    fontFamily: "Arial",
    fontSize : "50px",
    color : "#003f88",
    textAlign: "center" ,
    padding: "40px" 
  };