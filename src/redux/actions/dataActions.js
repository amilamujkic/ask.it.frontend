import {
    SET_ASKS,
    LOADING_DATA,
    LIKE_ASK,
    UNLIKE_ASK,
    DELETE_ASK,
    SET_ERRORS,
    POST_ASK,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_ASK,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
  } from '../types';
  import axios from 'axios';
  
  // Get all asks
  export const getAsks = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/asks')
      .then((res) => {
        dispatch({
          type: SET_ASKS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ASKS,
          payload: []
        });
      });
  };
  export const getAsk = (askId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/ask/${askId}`)
      .then((res) => {
        dispatch({
          type: SET_ASK,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
  // Post asks
  export const postAsk = (newAsk) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/ask', newAsk)
      .then((res) => {
        dispatch({
          type: POST_ASK,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  // Like asks
  export const likeAsk = (askId) => (dispatch) => {
    axios
      .get(`/ask/${askId}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_ASK,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Unlike asks
  export const unlikeAsk = (askId) => (dispatch) => {
    axios
      .get(`/ask/${askId}/unlike`)
      .then((res) => {
        dispatch({
          type: UNLIKE_ASK,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Submit a comment
  export const submitComment = (askId, commentData) => (dispatch) => {
    axios
      .post(`/ask/${askId}/comment`, commentData)
      .then((res) => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  export const deleteAsk = (askId) => (dispatch) => {
    axios
      .delete(`/ask/${askId}`)
      .then(() => {
        dispatch({ type: DELETE_ASK, payload: askId });
      })
      .catch((err) => console.log(err));
  };
  
  export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_ASKS,
          payload: res.data.asks
        });
      })
      .catch(() => {
        dispatch({
          type: SET_ASKS,
          payload: null
        });
      });
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };