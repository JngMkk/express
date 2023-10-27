import axios from "axios";

const url =
  "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

function getTop20MoviesPromise(_, res) {
  axios
    .get(url)
    .then((res) => {
      if (res.status != 200) {
        throw new Error("Request Failed");
      }
      if (res.data) {
        return res.data;
      }
      throw new Error("No data");
    })
    .then((data) => {
      if (!data.articleList || data.articleList.size == 0) {
        throw new Error("No data");
      }
      return data.articleList;
    })
    .then((articles) => {
      return articles.map((article, idx) => {
        return { title: article.title, rank: idx + 1 };
      });
    })
    .then((results) => {
      const arr = results.map((movieInfo) => {
        return `[${movieInfo.rank}위] ${movieInfo.title}`;
      });

      res.json(arr);
    })
    .catch((error) => {
      console.log("**Error occured**");
      console.error(error);
    });
}

async function getTop20MoviesAsync(_, res) {
  try {
    const response = await axios.get(url);
    const { data } = response;
    if (!data.articleList || data.articleList.size == 0) {
      throw new Error("No data");
    }
    const movieInfos = data.articleList.map((article, idx) => {
      return `[${idx + 1}위] ${article.title}`;
    });
    res.json(movieInfos);
  } catch (error) {
    throw new Error(error);
  }
}

const movieApp = { getTop20MoviesPromise, getTop20MoviesAsync };

export default movieApp;
