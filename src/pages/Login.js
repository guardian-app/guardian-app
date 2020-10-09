import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from 'react-bootstrap/Alert'

function Copyright() {
  // return (
  //   <Typography variant="body2" color="textSecondary" align="center">
  //     {'Copyright © '}
  //     <Link color="inherit" href="https://material-ui.com/">
  //       Your Website
  //     </Link>{' '}
  //     {new Date().getFullYear()}
  //     {'.'}
  //   </Typography>
  // );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignIn() {
  // constructor(){
  //   this.state ={
  //     username: "",
  //     password: "",
  //   }
  // }
   
  // render() {

    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      console.log(email)
      console.log(password)

      fetch("http://localhost:3000/",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address : email,
        password: password
      })
    })
      .then(function(response) {
      
        if(response.status == 404){
        //   alert(
        //    "Login Failed",
        //    "E-mail address is not registered!",
        //    [
        //      { text: "OK", onPress: ()=> {}  }
        //    ]
        //  )
       } 
       if(response.status == 401){
         console.log('failed2')
        //  alert(
        //    "Login Failed",
        //    "Incorrect password!",
        //    [
        //      { text: "OK", onPress: ()=> {} }
        //    ]
        //  )
       }
       else{
         return response;
       }
     }).then(function(response) {
       return response.json();
     }).then(function(json) {
       console.log('Request succeeded with JSON response:', json.token);
       console.log('Request succeeded with JSON response:', json.user);
 
       if(json.user.role == "parent"){
         console.log('pppppppppppppppppppppppppppp')
         localStorage.setItem("key", json.token);
         localStorage.setItem("user_id", json.user.user_id);
         localStorage.setItem("role", json.user.role);
         localStorage.setItem("first_name", json.user.first_name);
         localStorage.setItem("last_name", json.user.last_name);
         localStorage.setItem("username", json.user.email_address);
         localStorage.setItem("address", json.user.address);
         localStorage.setItem("phone_number", json.user.phone_number);
       }
       else{
         localStorage.setItem("key2", json.token);
         localStorage.setItem("user_id", json.user.user_id);
         localStorage.setItem("role", json.user.role);
         localStorage.setItem("first_name", json.user.first_name);
         localStorage.setItem("last_name", json.user.last_name);
         localStorage.setItem("username", json.user.email_address);
         localStorage.setItem("address", json.user.address);
         localStorage.setItem("phone_number", json.user.phone_number);
       }
         
         let value = localStorage.getItem("key");
         
         try {
           value = JSON.parse(value);
           //this.setState({ [key]: value });
           
         } catch (e) {
           
         }
         
        //   alert(
        //    "Login Successful",
        //    "",
        //    [
        //      { text: "OK", onPress: ()=> {if(localStorage.getItem("key")){
               
        //      }else{
               
        //      }}  }
        //    ]
        //  )
 
     }).catch(function(error) {
       console.log('Request failed:', error);
      

    })

      event.preventDefault();
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Link to="/dashboard">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            </Link>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={8}>
          <Copyright />
        </Box> */}
      </Container>
    );
  // } 

  
}