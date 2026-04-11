import rss from './rss.mjs'
import indexAlgolia from './index-algolia.mjs'

async function postbuild() {
  await rss()
  await indexAlgolia()
}

postbuild()
