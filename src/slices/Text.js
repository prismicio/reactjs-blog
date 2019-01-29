import React from 'react';
import {RichText} from 'prismic-reactjs';

export default class Text extends React.Component {
	render() {
		return (
			<div className="post-part single container">
				<div>
					{RichText.render(this.props.slice.primary.text, this.props.prismicCtx.linkResolver)}
				</div>
			</div>
		);
	}
} 