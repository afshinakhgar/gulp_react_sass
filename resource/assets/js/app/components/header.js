// main.js
import React from 'react';

// let Header = React.createClass({
//   render: function() {
//     return (
//       <div className="header">
//         Salam Mohammad ,<span>{this.props.friend}</span>
//       </div>
//     );
//   }
// });

class Header extends React.Component{
	render(){
		return (
	      <div className="header">
	        Salam Mohammad ,<span>Afshin</span>
	      </div>
	    );
	}
}

// module.exports = {
// 	Header:Header
// };
export default Header;
