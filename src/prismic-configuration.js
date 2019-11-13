import Prismic from 'prismic-javascript'

const apiEndpoint = 'https://your-repo-name.cdn.prismic.io/api/v2'

// -- Access token if the Master is not open
const accessToken = ''

// OAuth
// clientId: 'xxxxxx',
// clientSecret: 'xxxxxx',

// -- Links resolution rules
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes
export const linkResolver = (doc) => {
  if (doc.type === 'post') return `/blog/${doc.uid}`
  return '/'
}

export const client = Prismic.client(apiEndpoint, { accessToken })
