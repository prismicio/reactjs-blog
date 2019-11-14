import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';
import { Predicates } from 'prismic-javascript';

import { AuthorHeader, BlogPosts, DefaultLayout } from '../components';
import NotFound from './NotFound';
import { client } from '../prismic-configuration';

/**
 * Blog homepage component
 */
const BlogHome = () => {
  const [prismicData, setPrismicData] = useState({ homeDoc: null, blogPosts: null });
  const [notFound, toggleNotFound] = useState(false);

  // Get the homepage and blog post documents from Prismic
  useEffect(() => {
    const fetchPrismicData = async () => {
      try {
        const homeDoc = await client.getSingle('blog_home');
        const blogPosts = await client.query(
          Predicates.at('document.type', 'post'),
          { orderings: '[my.post.date desc]' }
        );
  
        if (homeDoc) {
          setPrismicData({ homeDoc, blogPosts });
        } else {
          console.warn('Blog Home document was not found. Make sure it exists in your Prismic repository');
          toggleNotFound(true);
        }
      } catch (error) {
        console.error(error);
        toggleNotFound(true);
      }
    }

    fetchPrismicData();
  }, []);

  // Return the page if a document was retrieved from Prismic
  if (prismicData.homeDoc) {
    const title = RichText.asText(prismicData.homeDoc.data.headline);

    return (
      <DefaultLayout seoTitle={title}>
        <AuthorHeader author={prismicData.homeDoc.data} />
        <BlogPosts posts={prismicData.blogPosts.results} />
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
}

export default BlogHome;
