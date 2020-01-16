import React from 'react';

const CommentsCard = props => {
  // props.comment, props.index
  console.log(props.comment);
  return (
    <div className='comments__card'>
      {/* text align it right */}
      <div className='comments__post'>
        <h3>Post</h3> 
        <p>{props.comment.post}</p>
      </div>
      <div className='comments__commentText'>
        <h3>Comment</h3>
        <p>{props.comment.text}</p>
      </div>

      
    </div>
  )
}

export default CommentsCard;