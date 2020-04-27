import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeAsk, unlikeAsk } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedAsk= () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.askId === this.props.askId
      )
    )
      return true;
    else return false;
  };
  likeAsk = () => {
    this.props.likeAsk(this.props.askId);
  };
  unlikeAsk = () => {
    this.props.unlikeAsk(this.props.askId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedAsk() ? (
      <MyButton tip="Undo like" onClick={this.unlikeAsk}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeAsk}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  askId: PropTypes.string.isRequired,
  likeAsk: PropTypes.func.isRequired,
  unlikeAsk: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeAsk,
  unlikeAsk
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);