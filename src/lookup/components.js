export function loadTweet(callback) {
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8000/api/tweets/"; //this is the url coming from the urls.py in th tweetapi folder
    const method = "GET";
    const responseType = "json";
  
    xhr.responseType = responseType;
    xhr.open(method, url);
    xhr.onload = function () {
      callback(xhr.response, xhr.status);
    };
    xhr.onerror = function (e) {
      callback({ message: "an error occured" }, 400);
    };
    xhr.send();
  }