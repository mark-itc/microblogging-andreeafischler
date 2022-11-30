 import "../App.css"
 import "./Home.css"
 import Button from "../components/Button"
 import CommentBox  from "../components/Comment-Box";
 import { useEffect, useState } from 'react';
 import { getTweetsFromServer} from "../services/get-tweets"

 function Home() {
    const [text, setText] = useState("");
    const [tweets, setTweets] = useState("");
    const [date, setDate] = useState(new Date());
    const [tweetsList, setTweetsList] = useState([]);
  
    console.log("tweetsList", tweetsList);
  
    useEffect(() => {
      getTweets();
    }, [text, date]);
  
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
            userName: "JYMMY",
            date: date.toISOString(),
          }),
        }
      )
        .then(() => {
          getTweets();
        })
        .catch((e) => {
          console.error(e);
        });
    };
  
    const getTweets = async () => {
      const results = await getTweetsFromServer();
      setTweetsList(results);
    };
  
    const renderTweets = () => {
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
  

    return(
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

    )
 }

 export default Home