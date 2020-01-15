import React from 'react';
import { Route } from 'react-router-dom';
//Components
import Comments from './components/Comments'
import Posts from './components/Posts'

function App() {
  return (
    <div className="App">
      <Route exact path='/posts' component={Posts} />
      <Route path='/posts/:id' component={Posts} />
    </div>
  );
}

export default App;