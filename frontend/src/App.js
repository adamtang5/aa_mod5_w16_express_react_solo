import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import * as sessionActions from './store/session';
import * as userActions from './store/user';
import * as roleActions from './store/role';
import Navigation from './components/Navigation';
import NewStoryForm from './components/NewStoryForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then((user) => {
        if (user) {
          dispatch(userActions.fetchUser(user.id));
          return;
        }
      })
      .then(() => dispatch(roleActions.fetchRoles()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          {/* <Route path="/login">
            <LoginFormPage />
            <LoginFormModal />
          </Route> */}
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
          </Route>
          <Route path="/new-story">
            <NewStoryForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
