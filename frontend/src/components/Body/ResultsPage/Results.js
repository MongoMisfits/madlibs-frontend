import React, { useEffect, useState } from "react";

function Results(props) {
  const [fullSentence, setFullSentence] = useState([]);
  const [otherUserData, setOtherUserData] = useState([]);
  const [matchingUsers, setMatchingUsers] = useState([])

  const concatFunction = (blanks, sentences) => {
    if (blanks) {
      let blankArr = blanks;
      let sentenceArr = sentences;
      let sentenceConcat = [];
      for (let i = 0; i < blankArr.length; i++) {
        sentenceConcat.push(<span>{sentenceArr[i]}</span>);
        sentenceConcat.push(
          <span className="underlinedWords">{blankArr[i]}</span>
        );
      }
      if (blankArr.length < sentenceArr.length) {
        sentenceConcat.push(<span>{sentenceArr[sentenceArr.length - 1]}</span>);
      }
      setFullSentence([...fullSentence, sentenceConcat]);
    }
  };

  const fetchData = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((users) => setOtherUserData(users));
  };

  const checkTemplate = () => {
    const templateData = otherUserData.filter(user => user.template[0].title === props.gameBodyResults.title)
    setMatchingUsers(templateData)
  }

  console.log(matchingUsers)

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    concatFunction(props.gameBodyResults.blanks, props.gameBodyResults.value);
    checkTemplate()
  }, [props.gameBodyResults]);

  const matchingUserJsx = matchingUsers.map((user) => {
      return(
          <div>
              <h1>Username: {user.user}</h1>

          </div>  
      )
  })

  return (
    <div className="resultsMain">
      {props.gameBodyResults && <h1>{props.gameBodyResults.title}</h1>}
      <div className="resultsBody">
        <h1>{fullSentence}</h1>
      </div>
      <h1>View more from this category</h1>
    </div>
  );
}

export default Results;
