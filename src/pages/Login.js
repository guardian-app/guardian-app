import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";



import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';


import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'; 
import Container from '@material-ui/core/Container';

window.$name = "testing" ;//global variable





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

  let history = useHistory();
 




  // constructor(){
  //   this.state ={
  //     username: "",
  //     password: "",
  //   }
  // }
   
  // render() {

    const classes = useStyles();
    //let userRole=null;
    //let token=null;
    var userRole;
    var token;
    
    const [email_address, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    //const [userRole,setuserRole] =useState("");
  
    function validateForm() {
      return email_address.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: email_address,
                              password:password
       })
    };
    fetch('http://localhost:3000/users/authenticate', requestOptions)
        .then(response => response.json())
        //.then(data => console.log(data.user.role))
        //.then(data => console.log(data.token))
       // .then((data) => console.log('This is your data', data))
         .then(data => userRole=data.user.role)
        
        // .then(data=>setuserRole(userRole.value))
        //.then(data => token=data.token)
        
        
        
        ;

        //console.log(userRole);
        //console.log(token);
        //console.log(token);
 
        //window.$name=userRole; 
        

        if(userRole=='admin'){
          console.log("admin login");
          history.push('/home')
         

        }
        

      // console.log(email_address)
      // console.log(password)

      
 
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
              value={email_address}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
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