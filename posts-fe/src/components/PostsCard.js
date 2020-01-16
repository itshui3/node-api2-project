import React from 'react';

const PostsCard = props => {

  return (
    <div className='post__card'>
      <h2>{props.post.title}</h2>
      <p>{props.post.contents}</p>
      <button>More Info</button>
    </div>
  )

}

export default PostsCard;