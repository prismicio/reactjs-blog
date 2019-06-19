import React from 'react'
import { shape, array } from 'prop-types'
import { RichText } from 'prismic-reactjs'
import { imagePropType } from '../../utils/propTypes'

const ImageCaption = ({ slice }) => {
  const defaultView = () => {
    return <div className='post-part single container'>
      <div className='block-img'>
        <img src={slice.primary.image.url} alt={slice.primary.image.alt} />
        {RichText.asText(slice.primary.caption) !== ''
          ? <p><span className='image-label'>
            {RichText.asText(slice.primary.caption)}
          </span></p>
          : null}
      </div>
    </div>
  }

  const emphasized = () => {
    return <div className='post-part single container'>
      <div className='block-img emphasized'>
        <img src={slice.primary.image.url} alt={slice.primary.image.alt} />
        {RichText.asText(slice.primary.caption) !== ''
          ? <p><span className='image-label'>
            {RichText.asText(slice.primary.caption)}
          </span></p>
          : null}
      </div>
    </div>
  }

  const imageFullWidth = () => {
    return <div className='blog-header single' style={{
      backgroundImage: 'url(' + slice.primary.image.url + ')'
    }}>
      <div className='wrapper'>
        {RichText.asText(slice.primary.caption) !== ''
          ? <h1>{RichText.asText(slice.primary.caption)}</h1>
          : null}
      </div>
    </div>
  }

  /* Render the appropiate image caption layout as specified by the user in the slice */
  switch (slice.slice_label) {
    case 'image-full-width':
      return imageFullWidth()

    case 'emphasized':
      return emphasized()

    default:
      return defaultView()
  }
}

ImageCaption.propTypes = {
  slice: shape({
    primary: shape({
      image: imagePropType.isRequired,
      caption: array
    })
  })
}

export default ImageCaption
