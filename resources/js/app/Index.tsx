import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter, 
    Switch,
    Route,
    Link
} from "react-router-dom";

import PeopleTable from "./components/PeopleTable";
import People from './components/people';

const App = (): JSX.Element => {
	return (
      <div className="container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/people">
            <People />
          </Route>
          <Route path="/">
            Welcome HOme
          </Route>
        </Switch>
      </div>
	)
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('root')
    );
}