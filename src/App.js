import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Cookies from 'universal-cookie';
import Routes from './Routes';
import Url from './components/Url';
import './assets/css/login.css';
import Logo from './assets/images/logo.png';

const cookies = new Cookies();

const styles = (theme) => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
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
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

  class Login extends React.Component {
    constructor() {
      super();
      this.state = {
        username: '',
        password: '',
        isLoading: cookies.get('userType')===undefined ? -1 : 1,
      };
      this.handlePostJSON = this.handlePostJSON.bind(this)
      this.handleUserChange = this.handleUserChange.bind(this)
      this.handlePassChange = this.handlePassChange.bind(this)
    }

    handleUserChange(evt) {
      this.setState({
        username: evt.target.value,
      });
    }

    handlePassChange(evt) {
      this.setState({
        password: evt.target.value,
      });
    }
  
  handlePostJSON = (e) => {
    e.preventDefault();
    this.setState({isLoading: 0});
    let formData = new FormData();
    formData.append('username',this.state.username);
    formData.append('password',this.state.password); 
		fetch(Url.login,{method: 'POST', body: formData})
		  .then(res => res.json())
      .then(data => {
        if(data.Result==='true'){
          cookies.set('userType', data.Role, {path:'/'});
          cookies.set('userID', data.ID, {path:'/'});
          cookies.set('name', data.Name, {path:'/'});
          this.setState({isLoading: 1});
        }else{
          alert(data.Message);
          this.setState({isLoading:-1});
        }
		  })
      .catch(e => console.log('error:', e))
  }

  render() {
    if (this.state.isLoading===1) {
      return <Routes value={cookies.get('userType')}/>
    } else if(this.state.isLoading===0){
      return <div/>;
    }else{
      const { classes } = this.props;
      const contents = <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img alt='' width='20%' src={Logo}/>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoComplete="username"
            value={this.state.username}
            onChange={this.handleUserChange}
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
            value={this.state.password}
            onChange={this.handlePassChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handlePostJSON}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link 
              href="https://account.live.com/ResetPassword.aspx?wreply=https://login.live.com/login.srf%3fwa%3dwsignin1.0%26rpsnv%3d13%26ct%3d1567458793%26rver%3d7.0.6738.0%26wp%3dMBI_SSL%26wreply%3dhttps%253A%252F%252Faccount.microsoft.com%252Fauth%252Fcomplete-signin%253Fru%253Dhttps%25253A%25252F%25252Faccount.microsoft.com%25252F%25253Flang%25253Den-hk%252526refd%25253Daccount.microsoft.com%252526refp%25253Dsignedout-index%26lc%3d1033%26id%3d292666%26lw%3d1%26fl%3deasi2%26ru%3dhttps%253A%252F%252Faccount.microsoft.com%252Faccount%253Flang%253Den-hk%26contextid%3dA2972AFC5DBE6202%26bk%3d1567458796&id=292666&uiflavor=web&uaid=ef692eaf981f49344185e34a7d10c778&mkt=EN-US&lc=1033&bk=1567458796&mn=" 
              variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {"Don't have an account? "}
              <Link href="https://signup.live.com" variant="body2">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
    return contents;
    }
      
      
    }
  }

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
