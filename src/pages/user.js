import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Ask from '../components/ask/Ask';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import AskSkeleton from '../util/AskSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    askIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const askId = this.props.match.params.askId;

    if (askId) this.setState({ askIdParam: askId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { asks, loading } = this.props.data;
    const { askIdParam } = this.state;

    const asksMarkup = loading ? (
      <AskSkeleton />
    ) : asks === null ? (
      <p>No questions from this user</p>
    ) : !askIdParam ? (
      asks.map((ask) => <Ask key={ask.askId} ask={ask} />)
    ) : (
      asks.map((ask) => {
        if (ask.askId !== askIdParam)
          return <Ask key={ask.askId} ask={ask} />;
        else return <Ask key={ask.askId} ask={ask} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {asksMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);