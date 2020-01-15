import constants from '../constants'

const initialState = {
  posts: [],
  comments: []
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

    case constants.GET_COMMENTS_BY_POST_ID:
      return {
        ...state,
        comments: payload
      }
    case constants.GET_COMMENT_BY_ID:
      return {
        ...state,
        comments: payload
      }

    default:
      return state;
  }
}