import React from 'react';
import ReactDOM from 'react-dom';

const App = (): JSX.Element => {
	return (
		<div className="container">
            IT Works!
        </div>
	)
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}