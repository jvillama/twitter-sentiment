import axios from 'axios';

function searchTweets(q) {
  return axios.get('https://immense-springs-80992-twitter.herokuapp.com/tweets/' + q)
    .then(function (payload) {
      var tweets = payload.data.statuses;
      return axios.all(tweets.map(analyzeTweet))
        .then(function(data) {
          return data;
        })
        .catch(handleError);
    });
}

async function analyzeTweet(tweet) {
    return await axios.post('https://immense-springs-80992-twitter.herokuapp.com/analyze_text', {text: tweet.text})
      .then(function(response){
        var obj = Object.assign(tweet, response.data);
        console.log(obj);
        return obj;
      })
      .catch(function(error){
        console.warn(error);
        return tweet;
      });
}

function handleError(error) {
  console.warn(error);
  return null;
}

export default {
  searchTweets: function (q) {
    return searchTweets(q);
  }
};
