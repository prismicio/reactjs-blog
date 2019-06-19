import React from 'react'
import { shape, array } from 'prop-types'
import { RichText } from 'prismic-reactjs'

const Text = ({ slice, prismicCtx }) => {
  return (
    <div className='post-part single container'>
      <div>
        <RichText render={slice.primary.text} linkResolver={prismicCtx.linkResolver} />
      </div>
    </div>
  )
}

Text.propTypes = {
  slice: shape({
    primary: shape({
      text: array.isRequired
    })
  })
}

export default Text
