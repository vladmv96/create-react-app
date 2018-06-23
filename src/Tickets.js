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
import Popup from 'reactjs-popup';
import CreateTicket from './CreateTicket';
import { saveStatuses } from './actions/auth_actions';
import Pagination from "react-js-pagination";
import { getStatuses } from './actions/auth_actions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
    root: {
        width: '80%',
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
            activePage: 1,
            count: '',
            status: '',
            anchorEl: null,
            anchorElCh: null,
            updBol: true,
            ticketId: null
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
        this.getStatuses();
        console.log(this.props.statuses);
    }

    shouldComponentUpdate = () => {
        return this.state.updBol;
    }

    renderItem = (item, index) => {
        return (
            <TableRow key={item.id}>
                <TableCell> {item.name} </TableCell>
                <TableCell> {item.phone} </TableCell>
                <TableCell> {item.email} </TableCell>
                <TableCell> <Button
                    name={item.id}
                    aria-owns={this.state.anchorElCh ? 'change-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleStatusChangeClick}
                >
                    {item.status.title}
                </Button>
                    <Menu
                        id="change-menu"
                        anchorEl={this.state.anchorElCh}
                        open={Boolean(this.state.anchorElCh)}
                        onClose={this.handleStatusChangeClose.bind(this, item)
                        }
                    >

                        {this.props.statuses.map(this.renderStatusesToChange) }

                    </Menu> </TableCell>
                <TableCell> {item.id} </TableCell>
            </TableRow>
        )
    }

    renderStatusesToFilter = (item, index) => {
        return (
            <MenuItem onClick={this.handleStatusFilterClose.bind(this, item.permalink)}>{item.title}</MenuItem>
        )
    }

    renderStatusesToChange = (item, index) => {
        return (
            <MenuItem onClick={this.changeStatus.bind(this, item.permalink)}>{item.title}</MenuItem>
        )
    }

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({ 'activePage': pageNumber }, () => {
            this.getTickets()
        });
    }

    getStatuses = () => {
        this.props.getStatuses().then(response => {
            console.log(response);
            this.props.saveStatuses(response.data.data.results);
        }).catch(err => {
            console.log(err.response);
        });

    }

    handleStatusFilterClick = event => {
        this.setState({ 'anchorEl': event.currentTarget });
    };

    handleStatusFilterClose = (permalink) => {
        this.setState({ 'status': permalink, 'anchorEl': null }, () => {
            this.getTickets()
        });
    };

    handleStatusChangeClick = event => {
        console.log(event.target.name);
        this.setState({ ticketId: parseInt(event.target.name, 10), 'anchorElCh': event.currentTarget });
    };

    handleStatusChangeClose = (permalink) => {
        this.setState({ 'status': permalink, 'anchorElCh': null });
    };

    getTickets = () => {
        axios({
            url: `https://api.evys.ru/admin2/project/${this.props.id}/tickets`,
            method: 'get',
            headers: { 'Authorization': `Basic ${this.props.token}`, 'Account-Name': this.props.permalink },
            params: { page: this.state.activePage, status: this.state.status }
        })
            .then(response => {
                console.log(response.data.data.results);
                let count = response.data.data.count;
                let tickets = response.data.data.results.map((item, index) => { return response.data.data.results[index] });
                this.setState({ 'count': count, 'tickets': tickets });

            })
            .catch(err => {
                console.log(err.response);
            })
    }

    changeStatus = (permalink) => {

        console.log('ACTION');

        console.log(permalink);
        console.log(this.state.ticketId);

        axios({
            url: `https://api.evys.ru/admin2/ticket/${this.state.ticketId}`,
            method: 'put',
            headers: { 'Authorization': `Basic ${this.props.token}`, 'Account-Name': this.props.permalink },
            data: { status: permalink }
        }).then(response => {
            console.log(response);
            this.getTickets();
        });

        this.setState({ 'anchorElCh': null }, () => {
            this.getTickets()
        });
    }

    render() {
        const { tickets } = this.state;
        const { anchorEl } = this.state;
        const { classes } = this.props;


        return (
            <div>
                <Button style={{ float: 'left' }} variant="raised" color="secondary" onClick={this.Exit}> Exit </Button>

                <Button
                    aria-owns={anchorEl ? 'status-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleStatusFilterClick}
                >
                    Status
                </Button>



                <Menu
                    id="status-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleStatusFilterClose}
                >



                    {this.props.statuses.map(this.renderStatusesToFilter)}

                </Menu>


                <Popup
                    trigger={<Button style={{ float: 'right', margin: '10px', marginLeft: '-20px' }} variant="fab" color="primary" aria-label="add" className={classes.button}>
                        <AddIcon />
                    </Button>}
                    modal
                    closeOnDocumentClick
                >
                    {close => (
                        <div>
                            <a className="close" style={{ float: 'right' }} onClick={close}>
                                &times;
                        </a>
                            <br />
                            <CreateTicket />
                        </div>
                    )}
                </Popup>
                <br />
                <h1>Tickets list</h1>
                {tickets.length !== 0 &&
                    <Paper className={classes.root}><Table className={classes.table}><TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Id</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {tickets.map(this.renderItem)}
                        </TableBody>
                    </Table>
                    </Paper>
                }
                <Pagination
                    hideNavigation
                    activePage={this.state.activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={this.state.count * 20}
                    pageRangeDisplayed={this.state.count}
                    onChange={this.handlePageChange}
                />
            </div>
        )
    }


}

const mapDispatchToProps = {
    savePermalink,
    saveToken,
    saveFirstName,
    saveProjectId,
    saveStatuses,
    getStatuses
}

const mapStateToProps = (state) => ({
    id: state.auth.id,
    token: state.auth.token,
    first_name: state.auth.first_name,
    permalink: state.auth.permalink,
    statuses: state.auth.statuses
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tickets));