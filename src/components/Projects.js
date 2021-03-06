import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePermalink, saveToken, saveFirstName, saveProjectId, getProjects } from '../actions/auth_actions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: '',
        }
    }

    Exit = () => {
        this.props.saveToken(null);
        this.props.saveFirstName(null);
        this.props.savePermalink(null);
        this.props.history.push('/login');
    }

    componentWillMount = () => {
        console.log(this.props.permalink);
        this.props.getProjects().then(
            response => {
                console.log(response);
                let projects = response.data.data.results.map((item, index) => { return response.data.data.results[index] });
                this.setState({ 'projects': projects });
            }).catch(err => {
                console.log(err.response);
            });
    }

    getTickets = (item) => {
        this.props.saveProjectId(item.id);
        this.props.history.push('/tickets');
    }


    renderItem = (item, index) => {
        return (
            <TableRow key={index}>
                <TableCell onClick={this.getTickets.bind(this, item)}> {item.name} </TableCell>
                <TableCell> {item.id} </TableCell>
            </TableRow>
        )
    }

    render() {
        const { projects } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <Button style={{ float: 'left' }} variant="raised" color="secondary" onClick={this.Exit}> Exit </Button>
                <br />
                <h1>Projects list</h1>
                {projects.length !== 0 &&
                    <Paper className={classes.root}><Table className={classes.table}><TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Id</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {projects.map(this.renderItem)}
                        </TableBody>
                    </Table>
                    </Paper>}
                <br />
            </div>
        )
    }


}

const mapDispatchToProps = {
    savePermalink,
    saveToken,
    saveFirstName,
    saveProjectId,
    getProjects
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    first_name: state.auth.first_name,
    permalink: state.auth.permalink
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Projects));