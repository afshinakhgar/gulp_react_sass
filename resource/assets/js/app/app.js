var React 	 = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Link } from 'react-router';
import Header from './components/Header';

class App extends React.Component {
	render(){
		return(
			<Header  />
		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('wrapper')
);