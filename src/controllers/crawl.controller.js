const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const cheerio = require("cheerio");
const kanjiJson = require("../utils/data/kanji.json");
const axios = require("axios");
const longerDelayBetweenBatches = 1000;

async function callApi(word) {
  try {
    const loadKanjiPayload = {
      "dict": "javi",
      "type": "kanji",
      "page": 1
    };
    const payload = Object.assign({}, loadKanjiPayload, { query: word });
    const apiEndpoint = "https://mazii.net/api/search";
    const response = await axios.post(apiEndpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response', response)
  } catch (error) {
    console.error(`Error for word ${word}: ${error.message}`);
  }
}

async function processBatch(words) {
  const delayBetweenRequests = 1000 / 200; // 200 requests per second

  for (const word of words) {
    await callApi(word);
    await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
  }
}


async function processFileInBatches(words, batchSize) {
  const totalWords = words.length;
  let startIndex = 0;

  while (startIndex < totalWords) {
    const endIndex = startIndex + batchSize;
    const batch = words.slice(startIndex, endIndex);
    await processBatch(batch);

    // Update the start index for the next batch
    startIndex = endIndex;

    // Optionally, add a longer delay between batches if needed
    await new Promise(resolve => setTimeout(resolve, longerDelayBetweenBatches));
  }
}

const batchSize = 200;

/* I'm really sorry Mazii, I'm just want to crawl data from your website to my database */
/* I'm really sorry Mazii, I'm just want to crawl data from your website to my database */
/* I'm really sorry Mazii, I'm just want to crawl data from your website to my database */
const apiEndpoint = "" 
const crawlWord = catchAsync(async (req, res) => {
  const words = kanjiJson.map(k => k.w);
  res.status(httpStatus.OK).send("Crawl successfully"); 

  await processFileInBatches(words, batchSize);
 
});


module.exports = {
  crawlWord
};
