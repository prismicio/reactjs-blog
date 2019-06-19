import React from 'react'
import { shape, array } from 'prop-types'
import { RichText } from 'prismic-reactjs'

const Quote = ({ slice }) => {
  return (
    <div className='post-part single container'>
      <span className='block-quotation'>
        {RichText.asText(slice.primary.quote)}
      </span>
    </div>
  )
}

Quote.propTypes = {
  slice: shape({
    primary: shape({
      quote: array.isRequired
    })
  })
}

export default Quote
