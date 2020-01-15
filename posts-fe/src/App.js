import React from 'react';
import { Route, Switch } from 'react-router-dom';
//Components
import Comments from './components/Comments'
import Posts from './components/Posts'
//Styling
import './App.scss';

const maxWidth = {
  width: '100%'
}

const fortyWidth = {
  width: '40%'
}

const fortyFiveWidth = {
  width: '45%'
}

function App() {
  return (
    <>
      <h1 className='header__title'>Welcome to Posts API's FrontEnd interface!</h1>
      <div className="App">
        <div style={fortyFiveWidth}>
          <Switch>
            <Route path='/posts/:id' component={Posts} />
            <Route path='/posts' component={Posts} />
          </Switch>
        </div>
        <div style={fortyFiveWidth}>
          <Switch>
            <Route path='/posts/:postId/comments/:id' component={Comments} />
            <Route path='/posts/:postId' component={Comments} />
          </Switch>
        </div>

      </div>
    </>
  );
}

export default App;