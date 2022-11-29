import "./App.css";
import Button from "./components/Button";
import CommentBox from "./components/Comment-Box";
import { useEffect, useState } from "react";
import { getTweetsFromServer } from "./services/get-tweets";

function App() {
  // const loadedTweets = localStorage.getItem("tweets")
  //   ? JSON.parse(localStorage.getItem("tweets"))
  //   : [];

  const [text, setText] = useState("");
  const [tweets, setTweets] = useState("");
  const [date, setDate] = useState(new Date());

  // useEffect(() => {
  //   localStorage.setItem("tweets", JSON.stringify(tweets));
  // }, [tweets]);

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

    fetch(
      "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          userName: "Yonatan",
          date: date.toISOString(),
        }),
      }
    ).then(() => {
      console.log("added");
    });
  }

  const fetchFromAPI = async () => {
    const results = await getTweetsFromServer();
    console.log("results", results);
  };

  fetchFromAPI();

  // const renderTweets = () => {
  //   return tweets.map((tweet) => {
  //     return (
  //       <CommentBox key={tweet.id} text={tweet.text} date={tweet.createdAt} />
  //     );
  //   });
  // };

  let showError = false;
  if (text.length > 140) {
    showError = true;
  }
  // const isEmptyNotes = tweets.length === 0;

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
        {/* {isEmptyNotes ? (
          <div></div>
        ) : (
          tweets.map((tweet) => (
            
          ))
        )} */}
      </div>
    </div>
  );
}

export default App;
