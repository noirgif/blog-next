import { algoliasearch } from 'algoliasearch'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'

const ALGOLIA_APP_ID = 'BSZX4B7QWI'
const ALGOLIA_INDEX_NAME = 'mistymui-posts'

async function indexAlgolia() {
  const adminApiKey = process.env.ALGOLIA_ADMIN_API_KEY
  if (!adminApiKey) {
    console.log('ALGOLIA_ADMIN_API_KEY not set, skipping Algolia indexing')
    return
  }

  const client = algoliasearch(ALGOLIA_APP_ID, adminApiKey)

  const posts = allCoreContent(sortPosts(allBlogs)).map((post) => ({
    objectID: post.slug,
    ...post,
  }))

  await client.saveObjects({ indexName: ALGOLIA_INDEX_NAME, objects: posts })
  console.log(`Indexed ${posts.length} posts to Algolia`)
}

export default indexAlgolia
