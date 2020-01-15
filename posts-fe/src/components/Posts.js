//React
import React, { useEffect } from 'react';
//Axios
import axios from 'axios';
//Redux
import { useDispatch, connect } from 'react-redux';
import constants from '../redux/constants'

const Posts = props => {
  const dispatch = useDispatch();
  console.log(props.match.params.id);
  useEffect(() => {
    if(props.match.params.id) {
      axios.get(`http://localhost:5000/api/posts/${props.match.params.id}`)
        .then(res => {
          console.log(res)
          dispatch({ type: constants.GET_POST_BY_ID, payload: res.data })
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      axios.get('http://localhost:5000/api/posts')
        .then(res => {
          console.log(res)
          dispatch({ type: constants.GET_POSTS, payload: res.data[0] })
        })
        .catch(err => {
          console.log(err);
        })
    }


  }, [])


 

  // write Posts.js such that it can use the props.history.location
  return (
    <>
      {
        props.posts && props.posts.map((post, index) => (
          <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.contents}</p>
          </div>
        ))
      }
    </>
  )
}

const mapStateToProps = ({ postsReducer }) => {
  return {
    posts: postsReducer.posts
  }
}

export default connect(mapStateToProps)(Posts);