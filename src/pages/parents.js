import React, { Component } from 'react';


class parents extends Component{

  

  constructor(props){
    super(props);
    this.state={
      items:[],
      isLoaded:false,
    }


  }

  componentDidMount(){

   const name = window.$name;

 
    console.log(name); // 'king'

  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email_address: email_address,
  //                           password:password
  //    })
  // };






    fetch('http://localhost:3000/parents')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items:json,
      })
    });
  }

  render(){

    var { isLoaded, items }= this.state;

    if(!isLoaded){
      const remember=localStorage.getItem('testing');
    return <div>{remember}</div>
  

    
      //console.log(name);

    }

    else{

      return(

        <div className="parents">
         
          data has been loaded
  
        </div>
  
  
      );

    }

    



  }


}

export default parents;