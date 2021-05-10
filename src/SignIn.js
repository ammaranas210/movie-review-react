import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {  Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

function Footer() {
  return (
    <>
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/anasnew99/">
        Anas Aneeque
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    <Typography variant="body2" color="textSecondary" align="center" marginTop={8}> Assignment made for AsIndiaInnovation Internship.</Typography>
    </>
  );
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
  tooltipText: {
      '& > svg':{
          fontSize: '.8rem',
          marginRight:theme.spacing(1)
      },
      '& > span,p':{
          fontSize: '.8rem',
          lineHeight: '1'
      }
  }
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function SignIn(props) {
  const classes = useStyles();
  const [showError,setShowError] = useState({
      email:false,
      password:false
  });
  const [formValue,setFormValue] = useState({
      email: '',
      password: ''
  });
  const [validation,setValidation] = useState({email:false,password:false});
  const [tooltip,setTooltip] = useState({email: false,password:false});
  const showTooltip = (e)=>{
      setTooltip({...tooltip,[e.target.name]:true});
  }
  const unShowTooltip = (e)=>{
      setTooltip({...tooltip,[e.target.name]:false});
  }
  const checkValidation = (formValues)=>{
    let validation = {
          email: false,password:false
    }
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formValues.email)){
        validation.email = true;
    }
    if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(formValues.password)){
        console.log('Password Tested');
        validation.password = true;
    }
    return validation;
  }
  const onChangeForm = (e)=>{ 
    const newFormValues = {...formValue,[e.target.name]:e.target.value};
    setFormValue(newFormValues);
    setValidation(checkValidation(newFormValues));
    setShowError({...showError,[e.target.name]:true});
  };

  const handleLogIn = (e)=>{
    console.log('Handle Submit');
    e.preventDefault();
    props.onLogin(formValue);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Movie Review App
        </Typography>
        <form className={classes.form} noValidate >
        <HtmlTooltip open={!validation.email && tooltip.email && showError.email}
            title = {
                <>
                    <Typography variant="body2" className={classes.tooltipText}>
                        <InfoIcon /> 
                        <span>Invalid Email</span>
                    </Typography>
                </>
            }
            placement={'right'}
            arrow
        >
          <TextField
            onFocus={showTooltip}
            onBlur={unShowTooltip}
            variant="outlined"
            margin="normal"
            value={formValue.email}
            onChange={onChangeForm}
            error={!validation.email && showError.email}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </HtmlTooltip>
        <HtmlTooltip 
            open={!validation.password && tooltip.password && showError.password}
            placement={'right'}
            title = {
                <>
                    <Typography variant="body2" className={classes.tooltipText}>
                        <InfoIcon /> 
                        <span>Password must contain:</span>
                        <p><i>6-16 Letters</i></p>
                        <p><i>Atleast An Upper, A Lowercase</i></p>
                        <p><i>Atleast A Digit, a special Symbol</i></p>
                    </Typography>
                </>
            }
            arrow
        >
            <TextField
              onFocus={showTooltip}
              onBlur={unShowTooltip}
              variant="outlined"
              margin="normal"
              value={formValue.password}
              error={!validation.password && showError.password}
              onChange={onChangeForm}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
        </HtmlTooltip>
          <Button
            onClick={handleLogIn}
            fullWidth
            disabled = {!validation.password || !validation.email}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}