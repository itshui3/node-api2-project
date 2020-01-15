import constants from '../constants'

const initialState = {
  posts: []
}

export const postsReducer = (state = initialState, {type, payload}) => {
  switch(type) {

    case constants.GET_POSTS:
      return {
        ...state,
        posts: payload
      }
    case constants.GET_POST_BY_ID:
      return {
        ...state,
        posts: payload
      }

    default:
      return state;
  }
}