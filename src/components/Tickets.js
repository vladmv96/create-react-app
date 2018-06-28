import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePermalink, saveToken, saveFirstName, saveProjectId, saveStatuses, getStatuses, getTickets, changeStatus, saveTickets, saveCount } from '../actions/auth_actions';
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
import CreateStatus from './CreateStatus';
import DeleteStatus from './DeleteStatus';
import Pagination from "react-js-pagination";
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
            count: null,
            status: 'novyi',
            anchorEl: null,
            anchorElCh: null,
            updBol: true,
            ticketId: null,
            selectedStatus: 'Новый',
            selectedStatusId: 1
        };
        this.getStatuses();
        this.getTickets();
    }


    Exit = () => {
        this.props.saveToken(null);
        this.props.saveFirstName(null);
        this.props.savePermalink(null);
        this.props.history.push('/login');
    }

    UNSAFE_componentWillMount = () => {
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
                    onClick={this.handleStatusChangeClick.bind(this, item.id)}
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

                        {this.props.statuses.map(this.renderStatusesToChange)}

                    </Menu> </TableCell>
                <TableCell> {item.id} </TableCell>
            </TableRow>
        )
    }

    renderStatusesToFilter = (item, index) => {
        return (
            <MenuItem onClick={this.handleStatusFilterElementClick.bind(this, item)} key={index}> {item.title} </MenuItem>
        )
    }

    renderStatusesToChange = (item, index) => {
        return (
            <MenuItem onClick={this.changeStatus.bind(this, item.permalink, this.state.ticketId)} key={index}>{item.title}</MenuItem>
        )
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber }, () => {
            this.getTickets()
        });
    }

    getStatuses = () => {
        this.props.getStatuses().then(response => {
            console.log(response);
            this.props.saveStatuses(response.data.data);
        }).catch(err => {
            console.log(err.response);
        });

    }

    handleStatusFilterClick = event => {
        this.setState({ 'anchorEl': event.currentTarget });
    };

    handleStatusFilterClose = () => {
        this.setState({ 'anchorEl': null }, () => {
            this.getTickets()
        });
    };

    handleStatusFilterElementClick = (item) => {

        this.setState({ 'activePage': 1, 'status': item.permalink, 'anchorEl': null }, () => {
            this.getTickets()
        });
        this.setState({ selectedStatus: item.title});
        this.setState({ selectedStatusId: item.id});
    };

    handleStatusChangeClick = (id, event) => {
        console.log(id);
        this.setState({ ticketId: id });
        this.setState({ 'anchorElCh': event.currentTarget });
    };

    handleStatusChangeClose = (permalink) => {
        this.setState({ 'status': permalink, 'anchorElCh': null });
    };

    getTickets = () => {

        this.props.getTickets(this.props.id, this.state.activePage, this.state.status ).then(
            response => {
                console.log(response.data.data.results);
                console.log(response.data.data.count);
                this.setState({'count': response.data.data.count})
                this.props.saveTickets(response.data.data.results);
            }).catch(err => {
              console.log(err.response);
            })


    }

    updateCount = (value) => {
        this.setState({ 'count': value });
     }

    changeStatus = (permalink, ticketId) => {

        this.props.changeStatus(ticketId, permalink).then(response => {
            console.log(response);
            this.getTickets();
        });

        this.setState({ 'anchorElCh': null }, () => {
            this.getTickets()
        });
    }

    render() {
        const { tickets } = this.props;
        const { anchorEl } = this.state;
        const { classes } = this.props;
        const { statuses } = this.props;
        const { count } = this.state;


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

                    {console.log(this.props.statuses)}
                    {statuses.map(this.renderStatusesToFilter)}

                </Menu>

                

                <Popup
                    trigger={<Button style={{ margin: '10px' }} color="primary" aria-label="add" className={classes.button} >
                        Create new status
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
                            <CreateStatus />
                        </div>
                    )}
                </Popup>

                <Popup
                    trigger={<Button style={{ margin: '10px' }} color="secondary" aria-label="add" className={classes.button}>
                        Delete status
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
                            <DeleteStatus selectedStatusId={this.state.selectedStatusId} updateCount={this.updateCount} />
                        </div>
                    )}
                </Popup>

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
                    totalItemsCount={count * 20}
                    pageRangeDisplayed={count}
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
    getStatuses,
    getTickets,
    changeStatus,
    saveTickets,
    saveCount
}

const mapStateToProps = (state) => ({
    id: state.auth.id,
    token: state.auth.token,
    first_name: state.auth.first_name,
    permalink: state.auth.permalink,
    statuses: state.auth.statuses,
    tickets: state.auth.tickets
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tickets));