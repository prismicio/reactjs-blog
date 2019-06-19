import React from 'react'
import { Link } from 'react-router-dom'
import { Date, RichText } from 'prismic-reactjs'
import { linkResolver } from '../prismic-configuration'

const BlogPosts = ({ posts }) => {
  const firstParagraph = (sliceZone) => {
    let firstTextSlice = sliceZone.find(slice => slice.slice_type === 'text')
    if (firstTextSlice != null) {
      // Set the character limit for the text we'll show in the homepage
      const textLimit = 300
      let text = RichText.asText(firstTextSlice.primary.text)
      let limitedText = text.substring(0, textLimit)

      if (text.length > textLimit) {
        // Cut only up to the last word and attach '...' for readability
        return (
          <p>{limitedText.substring(0, limitedText.lastIndexOf(' ')) + '...'}</p>
        )
      } else {
        // If it's shorter than the limit, just show it normally
        return <p>{text}</p>
      }
    } else {
      // If there are no slices of type 'text', return nothing
      return null
    }
  }

  return (
    <div className='blog-main'>
      {/* Working from the array of all blog posts, we process each one */}
      {posts.map((post) => {
        /* Store the date as a Date object so we can format it to whatever we need */
        let postDate = Date(post.data.date)
        /* Default title when post has no title set */
        const defaultTitle = [<h1 key='title'>Untitled</h1>]
        return (
          <div className='blog-post' data-wio-id={post.id} key={post.id} >
            <h2>
              {/* We render a link to a particular post using the linkResolver for the url and its title */}
              <Link to={linkResolver(post)}>
                {post.data.title.length !== 0
                  ? <RichText render={post.data.title} />
                  : defaultTitle}
              </Link>
            </h2>
            <p className='blog-post-meta'>
              <time className='created-at'>
                {/* Format the date to M d, Y */}
                {postDate ? new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                }).format(postDate) : ''}
              </time>
            </p>
            {/* Renders a small preview of the post's text */}
            {firstParagraph(post.data.body)}
          </div>
        )
      })}
    </div>
  )
}

export default BlogPosts
