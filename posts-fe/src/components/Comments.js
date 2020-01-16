//React
import React, { useEffect } from 'react';
import axios from 'axios';
//Redux
import { connect, useDispatch } from 'react-redux';
import constants from '../redux/constants'
//Styling
import './Comments.scss'
//Components
import CommentsCard from './CommentsCard';

const Comments = props => {
  const dispatch = useDispatch();
  // useEffect hook must differentiate between comment rendering 
  // get by id versus get posts at postId
  useEffect(() => {
    const id = props.match.params.id;
    const postId = props.match.params.postId;

    console.log(props.coments)

    if (!id && postId) {
      // get comments by post id
      axios.get(`http://localhost:5000/api/posts/${postId}/comments`)
        .then( res => {
          dispatch({ type: constants.GET_COMMENTS_BY_POST_ID, payload: res.data })
        })
        .catch( err => {
          console.log(err);
        })
    } else if (id && postId) {
      // get comment by id
      axios.get(`http://localhost:5000/api/posts/${postId}/comments/${id}`)
        .then( res => {
          dispatch({ type: constants.GET_COMMENT_BY_ID, payload: res.data })
        })
        .catch( err => {
          console.log(err);
        })

    } else {
      console.log('comments not rendered');
    }

  }, [])


  return (
    <>
      <div className='comments__page'>
        <h2>Moar Info</h2>
        <div className='comments__cont'>
          {
            props.comments && props.comments.map((comment, index) => (
              <CommentsCard key={index} comment={comment} index={index} />
            ))

          }
        </div>
      </div>
      
    </>
  )
}

const mapStateToProps = ({ postsReducer }) => {
  return {
    comments: postsReducer.comments
  }
}

export default connect(mapStateToProps)(Comments);