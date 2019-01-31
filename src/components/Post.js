import React from 'react';
import NotFound from './NotFound';
import {RichText} from 'prismic-reactjs';
import Text from './slices/Text';
import Quote from './slices/Quote';
import ImageCaption from './slices/ImageCaption';
import {Helmet} from 'react-helmet';
import Loader from './Loader';
import Footer from './Footer';

// Declare your component
export default class Post extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      doc: null,
      notFound: false,
    }
    if (props.prismicCtx) {
      this.fetchPage(props);
    }
  }

  componentDidUpdate(prevProps) {
    this.props.prismicCtx.toolbar();
    // We fetch the page only after props have changed and PrismicCtx is no longer null 
    if (!prevProps.prismicCtx) {
      this.fetchPage(this.props);
    }
  }

  fetchPage(props) {
    // We are using the function to get a document by its uid
    return props.prismicCtx.api.getByUID('post', props.match.params.uid, {}, (err, doc) => {
      if (doc) {
        // We put the retrieved content in the state as a doc variable
        this.setState({ doc });
      } else {
        // We changed the state to display error not found if no matched doc
        this.setState({ notFound: !doc });
      }
    });
  }

  renderSliceZone(sliceZone) {
    return sliceZone.map((slice, index) => {
      switch (slice.slice_type) {
        case ("image_with_caption"):
          return <ImageCaption slice={slice} key={'slice-' + index} />
        case ("quote"):
          return <Quote slice={slice} key={'slice-' + index}/>
        case ("text"):
          return <Text slice={slice} key={'slice-' + index} prismicCtx={this.props.prismicCtx}/>
        default:
          return null;
      }
    })
  }

  render() {
    if (this.state.doc) {
      let titled = this.state.doc.data.title.length !== 0 ;
      return (
        <div className="main">
          <Helmet>
            <title>{titled ? RichText.asText(this.state.doc.data.title) : 'Untitled'}</title>
          </Helmet>
          <div className="outer-container">
            <div className="back">
              <a href="/">back to list</a>
            </div>
          {/* Render the edit button */}
            <h1 data-wio-id={this.state.doc.id}>
              {titled ? RichText.asText(this.state.doc.data.title) : 'Untitled'}
            </h1>
          </div>
          {/* Go through the slices of the post and render the appropiate one */}
          {this.renderSliceZone(this.state.doc.data.body)}
          <Footer />
        </div>
      );
    } else if (this.state.notFound) {
      return <NotFound />;
    }
    return <Loader />;
  }
}