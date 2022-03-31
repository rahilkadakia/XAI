import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import TryMeCarousel from './views/TryMe';
import TryMe from './components/sections/TryMe';
import TryMeResult from './views/TryMeResult';
// import FullPageCarousel from "./components/elements/FullPageCarousel";
// import { TryMe } from './views/TryMe';


const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    document.body.classList.add('is-loaded')
    childRef.current.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute path="/login" component={Login} layout={LayoutDefault} />
          <AppRoute path="/register" component={Register} layout={LayoutDefault} />
          <AppRoute path="/try-me" component={TryMeCarousel}  layout={LayoutDefault} />
          <AppRoute path="/result/:id" component={TryMeResult}  layout={LayoutDefault} />
        </Switch>
      )} />
  );
}

export default App;