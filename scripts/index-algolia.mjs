import { algoliasearch } from 'algoliasearch'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import siteMetadata from '../data/siteMetadata.js'

const ALGOLIA_APP_ID = 'BSZX4B7QWI'
const ALGOLIA_INDEX_NAME = 'mistymui-posts'

async function indexAlgolia() {
  const adminApiKey = process.env.ALGOLIA_ADMIN_API_KEY
  if (!adminApiKey) {
    console.log('ALGOLIA_ADMIN_API_KEY not set, skipping Algolia indexing')
    return
  }

  const client = algoliasearch(ALGOLIA_APP_ID, adminApiKey)

  // DocSearch expects records with url and hierarchy fields
  const posts = allCoreContent(sortPosts(allBlogs)).map((post) => ({
    objectID: post.slug,
    url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
    type: 'lvl1',
    hierarchy: {
      lvl0: 'Blog',
      lvl1: post.title,
      lvl2: null,
      lvl3: null,
      lvl4: null,
      lvl5: null,
      lvl6: null,
    },
    content: post.summary || '',
    tags: post.tags,
    date: post.date,
  }))

  await client.clearObjects({ indexName: ALGOLIA_INDEX_NAME })
  await client.saveObjects({ indexName: ALGOLIA_INDEX_NAME, objects: posts })
  console.log(`Indexed ${posts.length} posts to Algolia`)
}

export default indexAlgolia
