
import React from 'react';
import { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {Link} from "react-router-dom";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { BrowserRouter as Router } from 'react-router-dom';
import Delete from "./../assets/delete.png";
import Update from "./../assets/updating.png";


class children extends Component {
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
    
        fetch('http://localhost:3000/children', requestOptions)
    
        .then(res => res.json())
    
        .then(json => {
          console.log('dkwopfkerjifoiw')
          console.log(json);
          this.setState({
    
            isLoaded: true,
    
            items:json,
  
            firstName:json[0].first_name
    
          })
    
        });
      }
    

    render () {

    return (

        <div className="container" style={container}>

            <Router>

            <h1>Children</h1>

            <div className="container1" style={container1}>

            {/* <TableContainer component={Paper}> */}

                            <Table  aria-label="simple table">

                                <TableHead style={tablehead}>

                                <TableRow >

                                    <TableCell style={tablecell}>E-Mail</TableCell>

                                    <TableCell style={tablecell} >First Name</TableCell>

                                    <TableCell style={tablecell} >Last Name</TableCell>

                                    <TableCell style={tablecell} >Address</TableCell>

                                    <TableCell style={tablecell} >Phone No.</TableCell>

                                    <TableCell style={tablecell} ></TableCell>

                                    <TableCell style={tablecell} ></TableCell>

                                </TableRow>

                                </TableHead>

                                <TableBody>
                                
                                    { this.state.items.map((item, index) => ( 

                                    <TableRow >

                                    <TableCell style={tablecell1} component="th" scope="row">{item.email_address}</TableCell>

                                    <TableCell style={tablecell1} >{item.first_name}</TableCell>

                                    <TableCell style={tablecell1} >{item.last_name}</TableCell>

                                    <TableCell style={tablecell1} >{item.address}</TableCell>

                                    <TableCell style={tablecell1} >{item.phone_number}</TableCell>

                                    <TableCell style={tablecell1} ><Link to={'/updatechild'}><img src={Update} /></Link></TableCell>

                                    <TableCell style={tablecell1} ><Link to={'/deletechild'}><img src={Delete} /></Link></TableCell>

                                    </TableRow>

                                    ))} 

                                </TableBody>

                            </Table>

    {/* </TableContainer> */}

            
            
        </div>

        </Router>

        </div>
    )
}

}

const container = {

    fontFamily: "Arial",
    fontSize : "50px",
    color : "#003f88",
    textAlign: "center" ,
    padding: "40px" 
  };
  const container1 = {

    fontFamily: "Arial",
    fontSize : "20px",
    color : "#003f88",
    textAlign: "center" ,
    padding: "40px",
    borderRadius:'25px' ,
  };
  const tablehead = {

    color: "red",
    backgroundColor: "#1a5b92",
    padding: "10px",
    borderRadius:'25px' ,
    fontSize : "50px",

   
  };
  const tablecell = {

    color: "white",
    padding: "10px",
    fontFamily: "Arial",
    fontSize : "18px",

   
  };
  const tablecell1 = {

    color: "black",
    padding: "10px",
    fontFamily: "Arial",
    fontSize : "18px",

   
  };



export default children


// export default children
