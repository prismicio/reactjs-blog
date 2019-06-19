import React, { useEffect, useState, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import { RichText } from 'prismic-reactjs'
import { SliceZone } from '../components/slices'
import { Loader, Footer } from '../components'
import NotFound from './NotFound'

import { client } from '../prismic-configuration'

const Post = ({ match: { params: { uid } } }) => {
  const [doc, setPostData] = useState({ post: null, loading: true })

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getByUID('post', uid)
      if (result) {
        window.PrismicToolbar.setupEditButton()
        return setPostData({ post: result, loading: false })
      } else {
        console.warn('Post document. Make sure it exists in your Prismic repository')
      }
    }
    fetchData()
  }, [uid]) // Only re-runs when the UID value has changed, for client-side navigation

  if (doc.loading) {
    return <Loader />
  }

  return (
    <Fragment>
      {
        doc.post ? (
          <div className='main'>
            <Helmet>
              <title>
                {doc.post.data.title.length !== 0
                  ? RichText.asText(doc.post.data.title)
                  : 'Untitled'}
              </title>
            </Helmet>
            <div className='outer-container'>
              <div className='back'>
                <Link to='/'>back to list</Link>
              </div>
              {/* Render the edit button */}
              <h1 data-wio-id={doc.post.id}>
                {doc.post.data.title.length !== 0
                  ? RichText.asText(doc.post.data.title)
                  : 'Untitled'}
              </h1>
            </div>
            {/* Go through the slices of the post and render the appropiate one */}
            <SliceZone slices={doc.post.data.body} />
            <Footer />
          </div>
        ) : <NotFound />
      }
    </Fragment>
  )
}

export default Post
