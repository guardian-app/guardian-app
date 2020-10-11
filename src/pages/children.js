import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Delete from "./../assets/delete.png";
import Update from "./../assets/updating.png";


function children() {
    
    return (
        <div className="container" style={container}>

            <h1>Children</h1>
            <div className="container1" style={container1}>
            {/* <TableContainer component={Paper}> */}
                            <Table  aria-label="simple table">
                                <TableHead style={tablehead}>
                                <TableRow >
                                    <TableCell style={tablecell}>E- Mail</TableCell>
                                    <TableCell style={tablecell} >First Name</TableCell>
                                    <TableCell style={tablecell} >Last Name</TableCell>
                                    <TableCell style={tablecell} >Address</TableCell>
                                    <TableCell style={tablecell} >Phone No.</TableCell>
                                    <TableCell style={tablecell} ></TableCell>
                                    <TableCell style={tablecell} ></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                
                                    <TableRow >
                                    <TableCell style={tablecell1} component="th" scope="row">hdfd</TableCell>
                                    <TableCell style={tablecell1} >kdfdjshfjsd</TableCell>
                                    <TableCell style={tablecell1} >hdsjsk</TableCell>
                                    <TableCell style={tablecell1} >nkxc</TableCell>
                                    <TableCell style={tablecell1} >jfdk</TableCell>
                                    <TableCell style={tablecell1} ><img src={Update} /></TableCell>
                                    <TableCell style={tablecell1} ><img src={Delete} /></TableCell>
                                    </TableRow>
                               
                                </TableBody>
                            </Table>
    {/* </TableContainer> */}

            
            
        </div>
        </div>
    )
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


