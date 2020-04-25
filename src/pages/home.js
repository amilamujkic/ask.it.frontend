import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Ask from '../components/ask/Ask';
import Profile from '../components/profile/Profile';
import AskSkeleton from '../util/AskSkeleton';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getAsks();
  }
  render() {
    const { asks, loading } = this.props.data;
    let recentAsksMarkup = !loading ? (
      asks.map((ask) => <Ask key={ask.askId} ask={ask} />)
    ) : (
      <Askskeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentAsksMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getAsks: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getAsks }
)(home);