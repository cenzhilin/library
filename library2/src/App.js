import React  ,{useReducer}from 'react';
import { BrowserRouter as Router,Link  ,Route,Switch} from 'react-router-dom';

import Index from './pages/index';
import Neat from './pages/neat';
import NBookshelf from './pages/Nbookshelf';
import PBookshelf from './pages/Pbookshelf';
import Place from './pages/place';
import {Context} from'./Context' ;
import reducer from'./reducer';

function App() {
  const initState={
host:'http://127.0.0.1'
  }
const[state,dispatch]=useReducer(reducer,initState);

  return (
    <Router>
      <Context.Provider value={{state ,dispatch}}>
    <Switch>
        <Route path='/' exact component={Index}></Route>
        <Route path='/neat/:id' exact component={Neat}></Route>
        <Route path='/neat/:nid/bookshelf/:nbsid' exact component={ NBookshelf}></Route>
        <Route path='/place/:id' exact component={Place}></Route>
        <Route path='/place/:pid/bookshelf/:pbsid' exact component={ PBookshelf}></Route>

        </Switch>
        </Context.Provider>
    </Router>
  );
}

export default App;



