import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { savePermalink } from './actions/auth_actions';
import { saveToken } from './actions/auth_actions';
import { saveFirstName } from './actions/auth_actions';
import { saveProjectId } from './actions/auth_actions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
    root: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
});

class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: '',
        }
    }

    Exit = () => {
        this.props.saveToken(null);
        this.props.saveFirstName(null);
        this.props.savePermalink(null);
        this.props.history.push('/login');
    }

    componentWillMount = () => {
        console.log(this.props.id);
        this.getTickets();
    }

    renderItem = (item, index) => {
        return (
            <TableRow key={index}>
                <TableCell> {item.name} </TableCell>
                <TableCell> {item.phone} </TableCell>
                <TableCell> {item.email} </TableCell>
                <TableCell> {item.id} </TableCell>
            </TableRow>
        )
    }

    createTicket = () => {
        this.props.history.push('/newticket');

    }

    getTickets = () => {
        axios({
            url: `https://api.evys.ru/admin2/project/${this.props.id}/tickets`,
            method: 'get',
            headers: { 'Authorization': `Basic ${this.props.token}`, 'Account-Name': this.props.permalink }
        })
            .then(response => {
                console.log(response);
                let tickets = response.data.data.results.map((item, index) => { return response.data.data.results[index] });
                this.setState({ 'tickets': tickets });
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    render() {
        const { tickets } = this.state;
        const { classes } = this.props;
        console.log(tickets);

        return (
            <div>
                <Button style={{ float: 'left' }} variant="raised" color="secondary" onClick={this.Exit}> Exit </Button>
                <Button style={{ float: 'right', margin: '10px', marginLeft: '-20px' }} variant="fab" color="primary" aria-label="add" className={classes.button} onClick={this.createTicket}>
                    <AddIcon />
                </Button>
                <br />
                <h1>Tickets list</h1>
                {tickets.length !== 0 &&
                    <Paper className={classes.root}><Table className={classes.table}><TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Id</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {tickets.map(this.renderItem)}
                        </TableBody>
                    </Table>
                    </Paper>
                }
            </div>
        )
    }


}

const mapDispatchToProps = {
    savePermalink,
    saveToken,
    saveFirstName,
    saveProjectId
}

const mapStateToProps = (state) => ({
    id: state.auth.id,
    token: state.auth.token,
    first_name: state.auth.first_name,
    permalink: state.auth.permalink
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tickets));