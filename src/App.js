import React from 'react';
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './Components/Auth/useAuth';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Entry from './Components/Auth/Entry';
import Quiz from './Components/Quiz/Quiz';

export const WebsiteName = "Quiz App";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Header />

          <main id="mainPage">
            <Switch>
              <Route path='/entry'>
                <Entry />
              </Route>
              <Route path='/quiz'>
                <Quiz />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </main>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
