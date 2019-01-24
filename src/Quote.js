import React from 'react';
import {RichText} from 'prismic-reactjs';

export default class Quote extends React.Component {
	render() {
		return (
			<div className="post-part single container">
				<span className="block-quotation">
					{RichText.asText(this.props.slice.primary.quote)}
				</span>
			</div>
		);
	}
} 