import { createContext, useState, useEffect } from "react"
import { getTweetsFromServer} from "./get-tweets"

const TweetsContext = createContext();

function TweetsContextProvider({children}) {
    
    const [tweetsList, setTweetsList] = useState([]);

    useEffect(() => {
        getTweets();
      }, []);
      
    const getTweets = async () => {
        const results = await getTweetsFromServer();
        setTweetsList(results);
      };

    return (
    <TweetsContext.Provider value={{tweetsList, setTweetsList}}>
     {children}
    </TweetsContext.Provider>
    )
}

export { TweetsContext, TweetsContextProvider}