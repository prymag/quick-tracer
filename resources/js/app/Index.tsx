import React from 'react';
import ReactDOM from 'react-dom';
import PeopleTable from "./components/PeopleTable";

const App = (): JSX.Element => {
	return (
		<div className="container">
            <PeopleTable />
        </div>
	)
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}