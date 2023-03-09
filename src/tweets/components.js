import React, { useEffect, useState } from "react";
import { loadTweet } from "../lookup";

export function TweetComponentForm(props) {
  const [newTweet, setNewTweet] = useState([]);
  const handlesubmit = (event) => {
    event.preventDefault();
    const newValue = textArearef.current.value;
    textArearef.current.value = "";
    let tempNewTweet = [...newTweet];
    tempNewTweet.unshift({
      content: newValue,
      id: 12344,
      likes: 0,
    });
    setNewTweet(tempNewTweet);
  };
  const className = props.className ? props.className : "my-5";
  const textArearef = React.createRef();
  return (
    <div className={className}>
      <div className="col-12">
        <form onSubmit={handlesubmit}>
          <textarea
            ref={textArearef}
            required={true}
            className="form-control"
            name="tweet"
          ></textarea>
          <button type="submit" className="btn btn-secondary my-3" value={""}>
            Save
          </button>
        </form>
      </div>
      <Tweetlist newTweet={newTweet} />
    </div>
  );
}

export function ActionBtn(props) {
  const { tweet, action } = props;
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
  const [useJustLiked, setUserJustLiked] = useState(
    tweet.useJustLiked === true ? true : false
  );
  const className = props.className
    ? props.className
    : "btn btn-primary btn-sm";
  const handleClick = (event) => {
    event.preventDefault();
    if (action.type === "like") {
      if (useJustLiked === true) {
        setUserJustLiked(false);
        setLikes(likes - 1);
      } else {
        setUserJustLiked(true);
        setLikes(likes + 1);
      }
    }
  };
  const actionDisplay = action.display ? action.display : "Action";
  const display =
    action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay;

  return (
    <button className={className} onClick={handleClick}>
      {display}
    </button>
  );
}
export function Tweet(props) {
  const { tweet } = props;
  const className = props.className ? props.className : "col-10 mx-auto";
  return (
    <div className={className}>
      <p>
        {tweet.id}-{tweet.content}
      </p>
      <div className="btn btn-group">
        <ActionBtn tweet={tweet} action={{ type: "like", display: "Like" }} />
        <ActionBtn
          tweet={tweet}
          action={{ type: "unlike", display: "Unlike" }}
        />
        <ActionBtn
          tweet={tweet}
          action={{ type: "retweet", display: "Retweet" }}
        />
      </div>
    </div>
  );
}

export function Tweetlist(props) {
  console.log(props.newTweet);
  const [tweetintServer, setTweetintServer] = useState([]);
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const final = [...props.newTweet].concat(tweetintServer);
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [props.newTweet, tweets, tweetintServer]);

  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200) {
        setTweetintServer(response);
      }
    };
    loadTweet(myCallback);
  }, []);

  return tweets.map((tweetitem, index) => {
    return (
      <Tweet
        tweet={tweetitem}
        key={`${index}-{tweetitem.id}`}
        className="my-5 py-5 border bg-white text-dark"
      />
    );
  });
}
