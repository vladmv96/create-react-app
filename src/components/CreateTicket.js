import React, { Component } from 'react';
import './styles/Form.css';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { saveToken, saveFirstName, saveProjectId, createTicket, getTickets, saveTickets } from '../actions/auth_actions';

const styles = theme => ({
    root: {
        display: 'inline',
    },
    margin: {
        margin: theme.spacing.unit,
        width: '80%'
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 2,
    },
    textField: {
        flexBasis: 200,
    },
});

class CreateTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            activePage: 1,
            status: 'novyi',
            refr: null
        }
    }

    Chit = () => {
        this.setState({ name: 'Darova', phone: '+79651840329', email: 'test@test.ru' });
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }


    createNewTicket = () => {
        let { name, phone, email } = this.state;
        this.setState({ name: '', phone: '', email: '' });

        this.props.createTicket(this.props.id, name, phone, email);
        
        this.props.getTickets(this.props.id, this.state.activePage, this.state.status ).then(
            response => {
                console.log(response.data.data.results);
                let tickets = response.data.data.results;
                this.props.saveTickets(tickets);
            })

    };



    render() {

        const { classes } = this.props;

        return (

            <div>

                <h2>Create new ticket</h2>
                <div>
                    <FormControl className={classNames(classes.margin, classes.withoutLabel, classes.textField)}>
                        <InputLabel htmlFor="adornment-name">Name</InputLabel>
                        <Input
                            id="adornment-name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleUserInput}
                        />
                    </FormControl>
                    <br />

                    <FormControl className={classNames(classes.margin, classes.withoutLabel, classes.textField)}>
                        <InputLabel htmlFor="adornment-phone">Phone</InputLabel>
                        <Input
                            id="adornment-phone"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleUserInput}
                        />
                    </FormControl>
                    <br />

                    <FormControl className={classNames(classes.margin, classes.withoutLabel, classes.textField)}>
                        <InputLabel htmlFor="adornment-email">Email</InputLabel>
                        <Input
                            id="adornment-email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleUserInput}
                        />
                    </FormControl>
                </div>


                <br />
                <Button type="submit" variant="raised" color="primary" onClick={this.createNewTicket}> Create </Button>
            </div>
        )
    }
}


const mapDispatchToProps = {
    saveToken,
    saveFirstName,
    saveProjectId,
    createTicket,
    getTickets,
    saveTickets
}

const mapStateToProps = (state) => ({
    id: state.auth.id,
    token: state.auth.token,
    first_name: state.auth.first_name,
    permalink: state.auth.permalink,
    statuses: state.auth.statuses
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateTicket));
