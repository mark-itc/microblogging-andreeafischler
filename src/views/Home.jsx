 import "../App.css"
 import "./Home.css"
 import Button from "../components/Button"
 import CommentBox  from "../components/Comment-Box";
 import { useEffect, useState, useContext } from 'react';
 import { getTweetsFromServer} from "../services/get-tweets"
 import { sendTweetsToServer } from "../services/TweetsContext"
 import LoadingSpinner  from "../components/LoadingSpinner";
 import { TweetsContext } from "../services/TweetsContext"
import { render } from "@testing-library/react";


 function Home() {

    const { tweetsList, setTweetsList } = useContext(TweetsContext)
    
    const [text, setText] = useState("");
    const [tweets, setTweets] = useState(tweetsList);
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setDate(new Date());
    },[text])
    
    useEffect(() => {
        const interval = setInterval(() => {
        console.log("update tweets List")
        getTweets()
      }, 20000);
      return () => clearInterval(interval)
    },[])
     
    const savedUserName =  JSON.parse(localStorage.getItem("userName"))
    
    useEffect(() => {
      setTweets([
        { text, id: tweets.length, savedUserName, createdAt: date.toISOString() },
        ...tweets,
      ]);
    },[text])
 
    function handleTweetOnChange(e) {
      setText(e.target.value);
    }
   
    function addTweetOnClick(e) {
      e.preventDefault();
      sendTweetsToServer()
    }
    
    const sendTweetsToServer = () => {
      fetch(
        "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: text,
            userName: savedUserName,
            date: date.toISOString(),
          }),
        }
      )
        .then(() => {
         getTweets()
        })
        .catch((e) => {
          console.error(e);
        });
    };
    

    const getTweets = async () => {
      setIsLoading(true)
      const results = await getTweetsFromServer();
      setTweetsList(results);
      setIsLoading(false)
      
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
          <div className="button-wrapper">
          <Button text="Tweet"onClick={addTweetOnClick} disabled={showError ? true : false} />
          </div>
        </form>
        <div className="box-container">{renderTweets()}</div>
      </div>

    )
 }

 export default Home