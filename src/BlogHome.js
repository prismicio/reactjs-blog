import React from 'react';
import NotFound from './NotFound';
import {RichText, Date} from 'prismic-reactjs';
import Prismic from 'prismic-javascript';

export default class BlogHome extends React.Component {
	state = {
		doc: null,
		notFound: false,
		posts: [],
	}

	componentWillMount() {
		this.fetchPage(this.props);
	}

	componentWillReceiveProps(props) {
	  this.fetchPage(props);
	}

	componentDidUpdate() {
	  this.props.prismicCtx.toolbar();
	}

	fetchPage(props) {
	  if (props.prismicCtx) {
	    // We are using the function to get a document by its uid
	    return props.prismicCtx.api.getSingle('blog_home').then(doc => {
	      if (doc) {
	        // We put the retrieved content in the state as a doc variable
	        this.setState({ doc });
	        props.prismicCtx.api.query(
	        	// Get the blog posts in descending order
	        	Prismic.Predicates.at('document.type', 'post'),
	        	{orderings : '[my.post.date desc]'}
	        ).then(res => {
	        	this.setState({posts: res.results});
	        });
	      } else {
	        // We changed the state to display error not found if no matched doc
	        this.setState({ notFound: !doc });
	      }
	    });
	  }
	  return null;
	}

	firstParagraph(post) {
		// Find the first text slice of post's body
		let firstTextSlice = post.data.body.find(slice => slice.slice_type === 'text');
		if (firstTextSlice != null) {
			// Set the character limit for the text we'll show in the homepage
			const textLimit = 300;
			let text = RichText.asText(firstTextSlice.primary.text);
			let limitedText = text.substring(0, textLimit);

			if (text.length > textLimit) {
				// Cut only up to the last word and attach '...' for readability
				return (
					<p>{limitedText.substring(0, limitedText.lastIndexOf(' ')) + '...'}</p>
				);
			} else {
				// If it's shorter than the limit, just show it normally
				return <p>{text}</p>;
			}
		} else {
			// If there are no slices of type 'text', return nothing
			return null;
		}
		
	}

	blogPostsSection() {
		return (
			<div className="blog-main">
				{this.state.posts.map((post, i) => {
					let postDate = Date(post.data.date);
					return (
						<div className="blog-post" data-wio-id={post.id} key={post.id} >
							<h2>
								<a href={this.props.prismicCtx.linkResolver(post)}>
									{RichText.render(post.data.title, this.props.prismicCtx.linkResolver)}
								</a>
							</h2>
							<p className="blog-post-meta">
								<time className="created-at">
									{new Intl.DateTimeFormat('en-US', {
										month: 'short', 
										day: '2-digit', 
										year: 'numeric'
									}).format(postDate)}
								</time>
							</p>
						{this.firstParagraph(post)}
						</div>
					);
				})}
			</div>
		);
	}

	blogHomeHead() {
		const avatar = {backgroundImage: 'url(' + this.state.doc.data.image.url +')'};
		return (
			<div className="home">
				<div className="blog-avatar" style={avatar}>
				</div>
				<h1 className="blog-title">{RichText.asText(this.state.doc.data.headline)}</h1>
				<p className="blog-description">{RichText.asText(this.state.doc.data.description)}</p>
			</div>
		);
	}

	render() {
		if (this.state.doc) {
			return (
				<div>
					{this.blogHomeHead()}
					{this.blogPostsSection()}
				</div>
			);
		} else if (this.state.notFound) {
			return <NotFound />;
		}
		return <h1>Loading</h1>;
	}
}