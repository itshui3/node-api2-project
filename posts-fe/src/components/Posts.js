//React
import React, { useEffect } from 'react';
//Axios
import axios from 'axios';
//Redux
import { useDispatch, connect } from 'react-redux';
import constants from '../redux/constants'
//Styles
import './Posts.scss';
//Components
import PostsCard from './PostsCard';

const Posts = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props.location);
    // props.location.search
    if(props.match.params.id) {
      axios.get(`http://localhost:5000/api/posts/${props.match.params.id}`)
        .then(res => {
          dispatch({ type: constants.GET_POST_BY_ID, payload: res.data })
        })
        .catch(err => {
          console.log(err);
        })
    } else if(props.location.search) {
      axios.get(`http://localhost:5000/api/posts/${props.location.search}`)
        .then( res => {
          console.log(res);
          dispatch({ type: constants.GET_POSTS, payload: res.data })
        })
        .catch( err => {
          console.log(err);
        })
    } else {
      axios.get('http://localhost:5000/api/posts')
        .then(res => {
          dispatch({ type: constants.GET_POSTS, payload: res.data })
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
          <PostsCard key={index} post={post} index={index} />
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