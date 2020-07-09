import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler,MDBRow,MDBCol, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask,MDBCard,MDBCardBody, MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,MDBInput } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class About extends React.Component{
    


    render(){
        return(
            <div>
                <Router>
                    <header>
                    <MDBView src="https://images.pexels.com/photos/3875160/pexels-photo-3875160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
          
                        <MDBMask overlay="black-strong " className="  flex-center flex-column text-white text-center">
                           <h2>About Us</h2>
                           <p align="center">
                           Guardian is to develop a child safety solution to track the real-time location of the child. Using Guardian, parents can ensure that their children are in safe locations and while keeping in touch with them. 
                            Nowadays, the biggest problem parents are facing is that when their children leave beyond their eyesight, they can’t ensure their safety. Guardian is addressing this problem and giving a solution to the parents. Using location history, parents also can view the places where their children have visited. Using real-time location tracking, if the child visits an unsafe location parent will get alerted so they can take immediate action. Parents can specify safe-areas, or Geo-fences easily using our system.
                            Parents would be provided a web application along with the mobile application companion to monitor their children. The children would require to have the mobile application installed on their mobile device.  
                           </p>
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



export default About;