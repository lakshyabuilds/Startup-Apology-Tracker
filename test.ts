import fetch from 'node-fetch';

async function testFetch() {
  try {
    const res = await fetch(`https://hn.algolia.com/api/v1/search?query=apology&tags=story&hitsPerPage=30`);
    const data = await res.json() as any;
    console.log('Hits apology:', data.hits?.length);
    if (data.hits && data.hits.length > 0) {
      console.log(data.hits[0].title);
    }
  } catch (e) {
    console.error(e);
  }
}
testFetch();
