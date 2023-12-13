const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const axios = require("axios");
const longerDelayBetweenBatches = 1000;
const listWord = require("../utils/data/test.json");
const proxyServer = "https://gimmeproxy.com/api/getProxy";
const fs = require("fs");
const Word = require("../models/word.model");
const { isKanjiWord } = require("../helpers/kanji");

const loadKanjiPayload = {
  "dict": "javi",
  "type": "kanji",
  "page": 1
};

const loadWordPayload = {
  dict: 'javi',
  limit: 20,
  page: 1,
  query: '',
  type: 'word'
};

const callApi = async (word) => {
  try {
    const apiEndpoint = "https://mazii.net/api/search";
    const wordPayload = { ...loadWordPayload, query: word };
    const kanjiPayload = { ...loadKanjiPayload, query: word };
    let kanjiRes = null;
    if (isKanjiWord(word)) {
      const kanjiRes = await axios.post(apiEndpoint, kanjiPayload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    const wordRes = await axios.post(apiEndpoint, { ...payload, query: word }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (kanjiRes) {
      
    }

    // const data = response.data;
    // const first = data[0];

    // if (!first) {
    //   console.log(`No result for word ${word}`);
    //   return;
    // }

    // await Word.create({
    //   meaning: first.means[0].mean_GG || first.means[0].mean,
    //   freq: first.freq,
    //   detail: 
    // });

   
  } catch (error) {
    console.error(`Error for word ${word}: ${error.message}`);
  }
};

function processBatch(words) {
  const delayBetweenRequests = 1000 / 200; 

  const promises = words.map(async (word) => {
    await callApi(word);
    await new Promise((resolve) => setTimeout(resolve, delayBetweenRequests));
  });

  return Promise.all(promises);
}



async function processFileInBatches(words, batchSize) {
  const totalWords = words.length;
  let startIndex = 0;

  while (startIndex < totalWords) {
    const endIndex = startIndex + batchSize;
    const batch = words.slice(startIndex, endIndex);
    await processBatch(batch);
    startIndex = endIndex;

    await new Promise(resolve => setTimeout(resolve, longerDelayBetweenBatches));
  }
}

const batchSize = 200;

/* I'm really sorry Mazii*/
/* I'm really sorry Mazii*/
/* I'm really sorry Mazii*/
const crawlWord = catchAsync(async (req, res) => {
  const words = Object.keys(listWord);
  res.status(httpStatus.OK).send("Crawl successfully"); 
  await processFileInBatches(words, batchSize);
 
});


module.exports = {
  crawlWord
};
