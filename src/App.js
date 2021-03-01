import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './Components/Auth/useAuth';

import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Entry from './Components/Auth/Entry';
import Quiz from './Components/Quiz/Quiz';
import Notfound from './Components/404/NotFound';
import ContactForm from './Components/ContactForm/ContactForm';

export const WebsiteName = "Quiz App";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Header />

          <main id="mainPage">
            <Switch>
              <Route path='/contact'>
                <ContactForm />
              </Route>
              <Route path='/entry'>
                <Entry />
              </Route>
              <Route path='/quiz'>
                <Quiz />
              </Route>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path="*">
                <Notfound />
              </Route>
            </Switch>
          </main>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
