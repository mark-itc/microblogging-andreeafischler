import "./App.css";
import Button from "./components/Button";
import CommentBox from "./components/Comment-Box";
import { useEffect, useState } from "react";
import { getTweetsFromServer } from "./services/get-tweets";

function App() {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState("");
  const [date, setDate] = useState(new Date());
  const [tweetsList, setTweetsList] = useState([]);

  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    setDate(new Date());
  }, [tweets]);

  function handleTweetOnChange(e) {
    setText(e.target.value);
  }

  function addTweetOnClick(e) {
    e.preventDefault();
    setTweets([
      { text, id: tweets.length, createdAt: date.toISOString() },
      ...tweets,
    ]);
    sendTweetsToServer();
  }

  const sendTweetsToServer = () => {
    fetch(
      "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          userName: "Yonathan",
          date: date.toISOString(),
        }),
      }
    ).then(() => {
      console.log("tweet was added");
    });
    renderTweets();
  };

  const getTweets = async () => {
    const results = await getTweetsFromServer();
    setTweetsList(results);
  };

  const renderTweets = () => {
    getTweets();
    return tweetsList.map((tweet) => {
      return (
        <CommentBox
          key={tweet.id}
          text={tweet.content}
          date={tweet.date}
          username={tweet.userName}
        />
      );
    });
  };

  let showError = false;
  if (text.length > 140) {
    showError = true;
  }

  return (
    <div className="container">
      <form className="form">
        <textarea
          className="custom-input"
          type="text"
          placeholder="What you have in mind..."
          onChange={handleTweetOnChange}
        ></textarea>
        {showError ? (
          <span className="error-message">
            The tweet can't contain more than 140 chars
          </span>
        ) : null}
        <Button onClick={addTweetOnClick} disabled={showError ? true : false} />
      </form>

      <div className="box-container">{renderTweets()}</div>
    </div>
  );
}

export default App;
