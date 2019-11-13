import React, { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { RichText } from 'prismic-reactjs'
import { Predicates } from 'prismic-javascript'
import { AuthorHeader, Footer, BlogPosts } from '../components'
import NotFound from './NotFound'
import { client } from '../prismic-configuration'

const BlogHome = () => {
  const [homeData, setHomeData] = useState({ home: null, loading: true })
  const [postsData, setPostsData] = useState({ posts: null, loading: true })

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getSingle('blog_home')
      if (result) {
        window.PrismicToolbar.setupEditButton()
        setHomeData({ home: result, loading: false })
      } else {
        setHomeData({ loading: false })
        console.warn('Blog Home document not found. Make sure it exists in your Prismic repository')
      }
    }

    const fetchPosts = async () => {
      const result = await client.query(Predicates.at('document.type', 'post'), { orderings: '[my.post.date desc]' })
      if (result) {
        setPostsData({ posts: result, loading: false })
      } else {
        setPostsData({ loading: false })
        console.warn('Blog posts not found. Make sure they exist in your Prismic repository')
      }
    }

    fetchPosts()
    fetchData()
  }, [])

  if (homeData.loading) {
    return null
  }

  return (
    <Fragment>
      {
        homeData.home ? (
          <div>
            <Helmet>
              <title>{RichText.asText(homeData.home.data.headline)}</title>
            </Helmet>
            {!homeData.loading ? <AuthorHeader author={homeData.home.data} /> : null}
            {!postsData.loading ? <BlogPosts posts={postsData.posts.results} /> : null}
            <Footer />
          </div>

        ) : <NotFound />
      }
    </Fragment>
  )
}

export default BlogHome
