import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { savePermalink, saveToken, saveFirstName, getAccounts } from '../actions/auth_actions';

const styles = theme => ({
    root: {
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 300,
    },
});

class Accounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: '',
        }
    }

    componentWillMount = () => {
        this.getAccounts();
    }

    getProjects = (item) => {
        this.props.savePermalink(item.permalink);
        this.props.history.push('/projects');
    }

    renderItem = (item, index) => {
        return (
            <TableRow key={index}>
                <TableCell onClick={this.getProjects.bind(this, item)}> {item.name} </TableCell>
                <TableCell> {item.id} </TableCell>
            </TableRow>
        )
    }

    Exit = () => {
        this.props.saveToken(null);
        this.props.saveFirstName(null);
        this.props.history.push('/login');
    }

    getAccounts = () => {

        this.props.getAccounts().then(response => {
            console.log(response);
            let accounts = response.data.data.map((item, index) => { return response.data.data[index] });
            this.setState({ 'accounts': accounts });
        }).catch(err => {
            console.log(err.response);
        })
    }

    render() {
        const { accounts } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <Button style={{ float: 'left' }} variant="raised" color="secondary" onClick={this.Exit}> Exit </Button>
                <br />

                <h1>
                    Hello, {this.props.first_name}
                </h1>

                {accounts.length !== 0 &&
                    <Paper className={classes.root}><Table className={classes.table}><TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Id</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {accounts.map(this.renderItem)}
                        </TableBody>
                    </Table>
                    </Paper>}

            </div>
        )
    }

}


const mapDispatchToProps = {
    savePermalink,
    saveToken,
    saveFirstName,
    getAccounts
}

const mapStateToProps = (state) => ({
    permalink: state.auth.permalink,
    token: state.auth.token,
    first_name: state.auth.first_name
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Accounts)); 