import {
    SET_ASKS,
    LIKE_ASK,
    UNLIKE_ASK,
    LOADING_DATA,
    DELETE_ASK,
    POST_ASK,
    SET_ASK,
    SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    asks: [],
    ask: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_ASKS:
        return {
          ...state,
          screams: action.payload,
          loading: false
        };
      case SET_ASK:
        return {
          ...state,
          scream: action.payload
        };
      case LIKE_ASK:
      case UNLIKE_ASK:
        let index = state.asks.findIndex(
          (ask) => ask.askId === action.payload.askId
        );
        state.asks[index] = action.payload;
        if (state.ask.askId === action.payload.askId) {
          state.ask = action.payload;
        }
        return {
          ...state
        };
      case DELETE_ASK:
        index = state.asks.findIndex(
          (ask) => ask.askId === action.payload
        );
        state.asks.splice(index, 1);
        return {
          ...state
        };
      case POST_ASK:
        return {
          ...state,
          asks: [action.payload, ...state.asks]
        };
      case SUBMIT_COMMENT:
        return {
          ...state,
          ask: {
            ...state.ask,
            comments: [action.payload, ...state.ask.comments]
          }
        };
      default:
        return state;
    }
  }