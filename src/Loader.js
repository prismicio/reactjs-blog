import React from 'react';
import './loader.css';

export default class Loader extends React.Component {
	render() {
		return (
			<div id="loader">
				<div className="lds-ripple">
		      <div></div>
		      <div></div>
	    	</div>
	  	</div>
  	);
	}
}