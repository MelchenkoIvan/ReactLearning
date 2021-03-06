import React from 'react'
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus,savePhoto } from '../../redux/profile-reducer'
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';



class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {

        return <Profile isOwner={!this.props.match.params.userId}
            {...this.props} profile={this.props.profile}
            status={this.props.status} updateStatus={this.props.updateStatus} 
            savePhoto={this.props.savePhoto}
            />
    }
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    userId: state.auth.userId

});


export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus,savePhoto }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
