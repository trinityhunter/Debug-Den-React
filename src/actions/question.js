import * as api from '../api/index'  

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  
  
  try{
    const { data } = await api.postQuestion(questionData)
    dispatch({type: 'POST_QUESTION', payload: data})
    dispatch(fetchAllQuestions())
    navigate('/')
  }
  catch(error){
    console.log(error)
  }
}

export const fetchAllQuestions = () => async (dispatch) => {

  try{

    const { data } = await api.getAllQuestions()
    dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: data})

  }
  catch(error){
    console.log(error);
  }
}

export const postAnswer = (answerData) => async (dispatch) => {
  try {
      const { noOfAnswers, answerBody, userAnswered, questionId } = answerData;

      const { data } = await api.postAnswer( noOfAnswers, answerBody, userAnswered, questionId )

      dispatch({ type: 'POST_ANSWER', payload: data})

      dispatch(fetchAllQuestions())
      
  } 
  catch (error) {
      console.log(error)
  }
}

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
      await api.deleteQuestion(id)
      dispatch(fetchAllQuestions())
      navigate('/')
  } catch (error) {
      console.log(error)
  }
}

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try{
    await api.deleteAnswer(id, answerId, noOfAnswers)
    dispatch(fetchAllQuestions())
  }
  catch(error){
    console.log(error)
  }
}


export const upVoteQuestion = (id, userEmail) => async(dispatch) => {
  try{
    await api.upVoteQuestion(id, userEmail);
    dispatch(fetchAllQuestions())
  }
  catch(error){
    console.log(error)
  }
}

export const downVoteQuestion = (id, userEmail) => async(dispatch) => {
  try{
    await api.downVoteQuestion(id, userEmail);
    dispatch(fetchAllQuestions())
  }
  catch(error){
    console.log(error)
  }
}