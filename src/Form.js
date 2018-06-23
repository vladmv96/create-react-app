import React, { Component } from 'react';
import './Form.css';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { btoa } from 'Base64';
import { connect } from 'react-redux';
import { saveToken } from './actions/auth_actions';
import { saveFirstName } from './actions/auth_actions';
import { getData } from './actions/auth_actions'

const styles = theme => ({
  root: {
    display: 'inline',
  },
  margin: {
    margin: theme.spacing.unit,
    width: 300,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    flexBasis: 200,
  },
});

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      showPassword: false,
      description: '',
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  getData = () => {
    let { login, password } = this.state;
    console.log('login: ' + this.state.login + ' password: ' + this.state.password)
    this.setState({ login: '', password: '' });
    let token = btoa(`${login}:${password}`);

    this.props.getData().then(
      response => {
        console.log(response);
        this.props.saveToken(token);
        this.props.saveFirstName(response.data.data.first_name);
        this.props.history.push('/accounts');
      }).catch(err => {
          console.log(err.response);
          this.setState({ description: err.response.data.error.description });
        })
    
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };


  render() {

    const { classes } = this.props;
    const { description } = this.state;

    return (
      <div className="form-group">
        <h2>Sign up</h2>
        <div>
          <FormControl className={classNames(classes.margin, classes.withoutLabel, classes.textField)}>
            <InputLabel htmlFor="adornment-login">Login</InputLabel>
            <Input
              id="adornment-login"
              name="login"
              type="login"
              value={this.state.login}
              onChange={this.handleUserInput}
            />
          </FormControl>
        </div>

        <div>
          <FormControl className={classNames(classes.margin, classes.textField)}>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              name="password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleUserInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        {description.length !== 0 &&
          <p style={{ color: 'red' }}>{description}</p>
        }

        <br />
        <Button type="submit" variant="raised" color="secondary" onClick={this.getData}> Sign up </Button>
      </div>
    )
  }
}


const mapDispatchToProps = {
  saveToken,
  saveFirstName,
  getData
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Form));
