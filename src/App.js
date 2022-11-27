import "./App.css";
import Button from "./components/Button";
import CommentBox from "./components/Comment-Box";
import { useEffect, useState } from "react";

function App() {
  const loadedTweets = localStorage.getItem("tweets")
    ? JSON.parse(localStorage.getItem("tweets"))
    : [];

  const [text, setText] = useState("");
  const [tweets, setTweets] = useState(loadedTweets);

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  function handleTweetOnChange(e) {
    setText(e.target.value);
  }

  function addTweetOnClick(e) {
    e.preventDefault();
    setTweets([{ text, id: tweets.length }, ...tweets]);
  }

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
      <div className="box-container">
        {tweets.map((tweet) => {
          return <CommentBox key={tweet.id} text={tweet.text} />;
        })}
      </div>
    </div>
  );
}

export default App;
