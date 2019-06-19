import React from 'react'
import { RichText } from 'prismic-reactjs'

const AuthorHeader = ({ author }) => {
  // Using the queried blog_home document data, we render the top section
  const avatar = { backgroundImage: 'url(' + author.image.url + ')' }
  return (
    <div className='home'>
      <div className='blog-avatar' style={avatar} />
      <h1 className='blog-title'>{RichText.asText(author.headline)}</h1>
      <p className='blog-description'>{RichText.asText(author.description)}</p>
    </div>
  )
}

export default AuthorHeader
