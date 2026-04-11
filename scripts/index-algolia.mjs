import { algoliasearch } from 'algoliasearch'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import siteMetadata from '../data/siteMetadata.js'

const ALGOLIA_APP_ID = 'BSZX4B7QWI'
const ALGOLIA_INDEX_NAME = 'mistymui-posts'

function stripMdx(text) {
  return text
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/`[^`]*`/g, '') // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // links -> text
    .replace(/^import\s.*/gm, '') // import statements
    .replace(/<[^>]+>/g, '') // JSX/HTML tags
    .replace(/^\s*[-*>]\s*/gm, '') // list markers, blockquotes
    .replace(/\n{2,}/g, '\n')
    .trim()
}

function buildRecords(post) {
  const url = `${siteMetadata.siteUrl}/blog/${post.slug}`
  const records = []

  // Strip code blocks before splitting by headings to avoid matching # in code
  const raw = post.body.raw.replace(/```[\s\S]*?```/g, '')
  const sections = raw.split(/^(#{1,6})\s+(.+)$/m)

  // First section (content before any heading)
  let currentLvl2 = null
  const preamble = stripMdx(sections[0])
  if (preamble) {
    records.push({
      objectID: `${post.slug}`,
      url,
      type: 'lvl1',
      hierarchy: { lvl0: 'Blog', lvl1: post.title, lvl2: null, lvl3: null, lvl4: null, lvl5: null, lvl6: null },
      content: preamble,
      tags: post.tags,
      date: post.date,
    })
  }

  // Process heading + content pairs (split produces [pre, hashes, title, content, hashes, title, content, ...])
  for (let i = 1; i + 2 < sections.length; i += 3) {
    const level = sections[i].length // number of # chars
    const heading = sections[i + 1].trim()
    const body = stripMdx(sections[i + 2])
    const anchor = heading.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')

    if (level <= 2) currentLvl2 = heading

    records.push({
      objectID: `${post.slug}#${anchor}`,
      url: `${url}#${anchor}`,
      type: level <= 2 ? 'lvl2' : 'lvl3',
      hierarchy: {
        lvl0: 'Blog',
        lvl1: post.title,
        lvl2: level <= 2 ? heading : currentLvl2,
        lvl3: level > 2 ? heading : null,
        lvl4: null,
        lvl5: null,
        lvl6: null,
      },
      content: body,
      tags: post.tags,
      date: post.date,
    })
  }

  // Fallback if no sections were created
  if (records.length === 0) {
    records.push({
      objectID: post.slug,
      url,
      type: 'lvl1',
      hierarchy: { lvl0: 'Blog', lvl1: post.title, lvl2: null, lvl3: null, lvl4: null, lvl5: null, lvl6: null },
      content: post.summary || '',
      tags: post.tags,
      date: post.date,
    })
  }

  return records
}

async function indexAlgolia() {
  const adminApiKey = process.env.ALGOLIA_ADMIN_API_KEY
  if (!adminApiKey) {
    console.log('ALGOLIA_ADMIN_API_KEY not set, skipping Algolia indexing')
    return
  }

  const client = algoliasearch(ALGOLIA_APP_ID, adminApiKey)

  const posts = sortPosts(allBlogs).filter((p) => !p.draft)
  const records = posts.flatMap(buildRecords)

  await client.clearObjects({ indexName: ALGOLIA_INDEX_NAME })
  await client.saveObjects({ indexName: ALGOLIA_INDEX_NAME, objects: records })
  console.log(`Indexed ${records.length} records from ${posts.length} posts to Algolia`)
}

export default indexAlgolia
