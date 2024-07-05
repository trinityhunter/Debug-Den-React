import axios from "axios";

const API = axios.create({ baseURL: "https://debug-den-springboot.onrender.com/api"})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/auth/login', authData)
export const signUp = (authData) => API.post('/auth/signup', authData)

export const postQuestion = (questionData) => API.post('/questions/', questionData)
export const getAllQuestions = () => API.get('/questions/');
export const deleteQuestion = (id) => API.delete(`/questions/${id}`)
// export const voteQuestion = (id, value, userId) => API.patch(`questions/vote/${id}`, {value, userId})
export const upVoteQuestion = (id, userEmail) => API.post(`questions/${id}/upvote`, {userEmail})
export const downVoteQuestion = (id, userEmail) => API.post(`questions/${id}/downvote`, {userEmail})


export const postAnswer = (noOfAnswers, answerBody, userAnswered, questionId) => API.post(`/answers/${questionId}`, { noOfAnswers, answerBody, userAnswered, questionId });
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answers/${id}`, {answerId, noOfAnswers})

export const fetchAllUsers = () => API.get('/users/')
export const updateProfile = (id, updateData) => API.put(`/users/${id}`, updateData)

// import axios from "axios";

// const API = axios.create({ baseURL: "https://debug-den-backend.onrender.com/"})

// API.interceptors.request.use((req) => {
//     if(localStorage.getItem('Profile')){
//         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
//     }
//     return req;
// })

// export const logIn = (authData) => API.post('/user/login', authData)
// export const signUp = (authData) => API.post('/user/signup', authData)

// export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
// export const getAllQuestions = () => API.get('/questions/get');
// export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`) 
// export const voteQuestion = (id, value, userId) => API.patch(`questions/vote/${id}`, {value, userId})

// export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId });
// export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, {answerId, noOfAnswers})

// export const fetchAllUsers = () => API.get('/user/getAllUsers')
// export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)