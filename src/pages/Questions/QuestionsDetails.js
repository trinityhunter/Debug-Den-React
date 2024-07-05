import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import {
  postAnswer,
  deleteQuestion,
  upVoteQuestion,
  downVoteQuestion
} from "../../actions/question";
import DisplayAnswer from "./DisplayAnswer";
import axios from "axios";

const QuestionsDetails = () => {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionsReducer);

  // console.log(questionsList.data);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/questions/`)
//       .then(function (response) {
//         // handle success
//         // setquestionsList(response);
//         settemp(response);
//         // console.log(response.data);
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//       .finally(function () {
//         // always executed
//       });
//   }, [id]);

  // var questionsList = [{
  //     _id: '1',
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "node js", "react js", "mongo db", "express js"],
  //     userPosted: "mano",
  //     userId: 1,
  //     askedOn: "jan 1",
  //     answer: [{
  //         answerBody: "Answer",
  //         userAnswered: 'kumar',
  //         answeredOn: "jan 2",
  //         userId: 2,
  //     }]
  // },{
  //     _id: '2',
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 0,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "R", "python"],
  //     userPosted: "mano",
  //     askedOn: "jan 1",
  //     userId: 1,
  //     answer: [{
  //         answerBody: "Answer",
  //         userAnswered: 'kumar',
  //         answeredOn: "jan 2",
  //         userId: 2,
  //     }]
  // },{
  //     _id: '3',
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 0,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "R", "python"],
  //     userPosted: "mano",
  //     askedOn: "jan 1",
  //     userId: 1,
  //     answer: [{
  //         answerBody: "Answer",
  //         userAnswered: 'kumar',
  //         answeredOn: "jan 2",
  //         userId: 2,
  //     }]
  // }]

  const [Answer, setAnswer] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const location = useLocation();
  const url = "https://debug-den.netlify.app";

  const handlePostAns = (e, answerLength, question) => {
    e.preventDefault();
    // console.log("Post Ans");
    // console.log({
    //     noOfAnswers: answerLength + 1,
    //     answerBody: Answer,
    //     userAnswered: User.user.name,
    //     questionId: question.id
    // });
    // console.log(Answer);
    if (User === null) {
      alert("Login or Signup to answer a question");
      Navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.user.name,
            questionId: question.id
          })
        );
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, Navigate));
  };

  const handleUpVote = () => {
    if(User == null){
        alert("Login or Signup to interact");
        Navigate("/Auth");
        return;
    }
    dispatch(upVoteQuestion(id, User.user.email));
  };

  const handleDownVote = () => {
    if(User == null){
        alert("Login or Signup to interact");
        Navigate("/Auth");
        return;
    }
    dispatch(downVoteQuestion(id, User.user.email));
  };

  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {
            // console.log(questionsList.data[0].id)

            questionsList.data
              .filter((question) => question.id == id)
              .map((question) => (
                
                <div key={question.id}>
                    <section className='question-details-container'>
                    {console.log(question)}
                        <h1>{question.questionTitle}</h1>
                        <div className='question-details-container-2'>
                            <div className="question-votes">
                                <img src={upvote} alt="" width='18' className='votes-icon' onClick={handleUpVote}/>
                                <p>{question.upVote.length - question.downVote.length}</p>
                                <img src={downvote} alt="" width='18' className='votes-icon' onClick={handleDownVote}/>
                            </div>
                            <div style={{width: "100%"}}>
                                <p className='question-body'>{question.questionBody}</p>
                                <div className="question-details-tags">
                                    {
                                        question.questionTags.map((tag) => (
                                            <p key={tag}>{tag}</p>
                                        ))
                                    }
                                </div>
                                <div className="question-actions-user">
                                    <div>
                                        <button type='button' onClick={handleShare}>Share</button>
                                        {
                                            User?.user?.email === question?.userEmail && (
                                                <button type='button' onClick={handleDelete}>Delete</button>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p>asked {moment(question.askedOn).fromNow()}</p>
                                        <Link to={`/Users/${question.userEmail}`} className='user-link' style={{color:'#0086d8'}}>
                                            <Avatar backgroundColor="orange" px='8px' py='5px' borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                            <div>
                                                {question.userPosted}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                {
                    question.noOfAnswers !== 0 ? (
                        <section>
                            <h3>{question.noOfAnswers} Answers</h3>
                            <DisplayAnswer key={question.id} question={question} handleShare={handleShare}/>
                        </section>
                    )
                    :
                    ""
                }
                    <section className='post-ans-container'>
                        <h3>Your Answer</h3>
                        {/* <h3>{question.answer.length}</h3> */}
                        {/* {console.log(question)} */}
                        <form onSubmit={ (e) => { handlePostAns(e, question.answers.length, question) }}>
                            <textarea name="" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea><br />
                            <input type="Submit" className='post-ans-btn'/>
                        </form>
                        <p>
                            Browse other Question tagged
                            {
                                question.questionTags.map((tag) => (
                                    <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                                ))
                            } or
                            <Link to={User === null ? `/Auth` : `/AskQuestion`} style={{textDecoration: "none", color:"#009dff"}}> ask your own question.</Link>
                        </p>
                    </section>
                </div>
              ))
          }
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;
