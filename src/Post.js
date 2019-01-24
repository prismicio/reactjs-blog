
import React from 'react';
import NotFound from './NotFound';
/*import PrismicReact from 'prismic-reactjs';*/
// Going granular for now to see what we actually need
import {RichText} from 'prismic-reactjs';
import Text from './Text';
import Quote from './Quote';
import ImageCaption from './ImageCaption';


// Declare your component
export default class Post extends React.Component {

  state = {
    doc: null,
    notFound: false,
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
    return null;
  }

  sliceSwitch(slice, index) {
    switch (slice.slice_type) {
      case ("image_with_caption"):
        return <ImageCaption slice={slice} key={'slice-' + index} />
      case ("quote"):
        return <Quote slice={slice} key={'slice-' + index}/>
      case ("text"):
        return <Text slice={slice} key={'slice-' + index}/>
      default:
        return null;
    }
  }

  render() {
    if (this.state.doc) {
      return (
        <div className="main">
          <div className="outer-container">
            <div className="back">
              <a href="./">back to list</a>
            </div>

            <h1 data-wio-id={this.state.doc.id}>
              {RichText.asText(this.state.doc.data.title)}
            </h1>
          </div>
        
          {this.state.doc.data.body.map((slice, i) => {
            return this.sliceSwitch(slice, i)
          })}
        </div>
      );
    } else if (this.state.notFound) {
      return <NotFound />;
    }
    return <h1>Loading</h1>;
  }
}