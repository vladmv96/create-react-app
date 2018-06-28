import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { deleteStatus, getStatuses, saveStatuses } from '../actions/auth_actions';



const styles = theme => ({
    root: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
});

class DeleteStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }



    renderStatuses = (item, index) => {
        return (
            <div key={index}>
                <br />
                <Button style={{ margin: '10px' }} color="secondary" aria-label="add" className={this.props.classes.button} onClick={this.deleteStatus.bind(this, item.id)}>
                    {item.title}
                </Button>
            </div>
        )
    }

    deleteStatus = (id) => {

        console.log(this.props.selectedStatusId)

        if ( id !== this.props.selectedStatusId) {

        this.props.deleteStatus(id).then(() => {
            this.props.getStatuses().then(response => {
            this.props.saveStatuses(response.data.data);
        })
        });
    } else { console.log('Status is selected') }

    }

    render() {


        return (
            <div>

                <h3> Select the status to delete </h3>

                <br />

                {this.props.statuses.map(this.renderStatuses)}

            </div>
        )
    }


}

const mapStateToProps = (state) => ({
    statuses: state.auth.statuses
})

const mapDispatchToProps = {
    deleteStatus,
    getStatuses,
    saveStatuses
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteStatus));