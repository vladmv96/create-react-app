import React, { Component } from 'react';
import './styles/Form.css';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { saveToken, saveFirstName, saveProjectId, createStatus, getStatuses, saveStatuses, getTickets } from '../actions/auth_actions';

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
            title: '',
            activePage: 1,
            status: 'novyi',
            refr: null
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }


    createNewStatus = () => {
        let { title } = this.state;
        this.setState({ title: '' });
        this.props.createStatus(title).then(() => {
            this.props.getStatuses().then(response => {
            console.log(response);
            this.props.saveStatuses(response.data.data);
        }).catch(err => {
            console.log(err.response);
        });

        });

    };



    render() {

        const { classes } = this.props;

        return (

            <div>

                <h2>Create new status</h2>
                <div>

                    <FormControl className={classNames(classes.margin, classes.withoutLabel, classes.textField)}>
                        <InputLabel htmlFor="adornment-email">Title</InputLabel>
                        <Input
                            id="adornment-title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleUserInput}
                        />
                    </FormControl>
                </div>


                <br />
                <Button type="submit" variant="raised" color="primary" onClick={this.createNewStatus}> Create </Button>
            </div>
        )
    }
}


const mapDispatchToProps = {
    saveToken,
    saveFirstName,
    saveProjectId,
    createStatus,
    getStatuses,
    saveStatuses,
    getTickets
}

const mapStateToProps = (state) => ({
    id: state.auth.id,
    token: state.auth.token,
    first_name: state.auth.first_name,
    permalink: state.auth.permalink,
    statuses: state.auth.statuses
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateTicket));
