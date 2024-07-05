import React from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './Questions.css'
import { deleteAnswer } from '../../actions/question'

import Avatar from '../../components/Avatar/Avatar'

const DisplayAnswer = ({question, handleShare}) => {

    const User = useSelector(state => state.currentUserReducer)

    const { id } = useParams()

    const dispatch = useDispatch()

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers-1))
    }

    // console.log(question);

    
    return (
        <div>
            {
                question.answers.map((ans) => (
                    <div className="display-ans" key={ans.id}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            {console.log(ans)}
                            <div>
                                <button type="button" onClick={handleShare}>Share</button>
                                {
                                    User !== null && User?.user?.email === ans?.userEmail && (
                                        <button type='button' onClick={()=>handleDelete(ans.id, question.noOfAnswers)}>Delete</button>
                                    )
                                }
                            </div>
                            <div>
                                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/Users/${ans.userEmail}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="lightgreen" px='8px' py='5px' borderRadius='4px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {ans.userAnswered}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswer