import React, { Component } from 'react';
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
        'Accept': 'application/json',

        'Content-Type': 'application/json',

        'Authorization':'Bearer '+remember

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

  <Table striped bordered hover variant="dark" responsive="sm">
    <thead>
      <tr>
        <th>User Id</th>

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

    <td>{item.user_id}</td>

    <td>{item.email_address}</td>

    <td>{item.first_name}</td>

    <td>{item.last_name}</td>

    <td>{item.phone_number}</td>

      </tr>
          ))}

        </tbody>

      </Table>

          

    

    </div>

      );

  }

}



export default parents;