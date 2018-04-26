import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const instance = axios.create({
  baseURL: 'http://localhost:3000'
  // headers: { 'token': localStorage.getItem('token') }
})
export default new Vuex.Store({
  state: {
    questions: '',
    answers: '',
    checkToken: localStorage.getItem('token'),
    checkTokenName: localStorage.getItem('name'),
    checkTokenEmail: localStorage.getItem('email')
  },
  getters: {
    getQuestion: state => {
      return state.questions
    },
    getAnswer: state => {
      return state.answers
    },
    getToken: state => {
      return state.checkToken
    },
    getTokenName: state => {
      return state.checkTokenName
    },
    getTokenEmail: state => {
      return state.checkTokenEmail
    }
  },
  mutations: {
    setQuestion (state, payload) {
      state.questions = payload
    },
    setAnswer (state, payload) {
      state.answers = payload
    },
    setToken (state, payload) {
      state.checkToken = payload
    },
    setTokenName (state, payload) {
      state.checkTokenName = payload
    },
    setTokenEmail (state, payload) {
      state.checkTokenEmail = payload
    }
  },
  actions: {
    getAllQuestion ({ commit }) {
      axios
        .get(`http://localhost:3000/questions/`, {})
        .then(response => {
          commit('setQuestion', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetailQuestion ({ commit }, payload) {
      axios
        .get(`http://localhost:3000/questions/${payload}`, {})
        .then(response => {
          commit('setQuestion', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
      axios
        .get(`http://localhost:3000/answers/${payload}`, {})
        .then(response => {
          commit('setAnswer', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addQuestion (context, payload) {
      instance
        .post('/questions/add', {
          title: payload.title,
          content: payload.content
        }, {
          headers: { 'token': localStorage.getItem('token') }
        })
        .then(response => {
          context.dispatch('getAllQuestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateQuestion (context, payload) {
      instance
        .put(`/questions/update/${payload.id}`, {
          title: payload.title,
          content: payload.content
        }, {
          headers: { 'token': localStorage.getItem('token') }
        })
        .then(response => {
          context.dispatch('getDetailQuestion', payload.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeQuestion (context, payload) {
      console.log(payload.id)
      instance
        .delete(`/questions/delete/${payload.id}`, {
          headers: { 'token': localStorage.getItem('token') }
        })
        .then(response => {
          context.dispatch('getAllQuestion')
        }).catch(err => {
          console.log('dan ternyata error')

          console.log(err)
        })
    },
    upQuestion (context, payload) {
      instance
        .put(`/questions/voteUp/${payload.idQuestion}`, {},
          {
            headers: { 'token': localStorage.getItem('token') }
          })
        .then(response => {
          context.dispatch('getDetailQuestion', payload.idQuestion)
        })
        .catch(err => {
          console.log(err)
        })
    },
    downQuestion (context, payload) {
      instance
        .put(`/questions/voteDown/${payload.idQuestion}`, {},
          {
            headers: { 'token': localStorage.getItem('token') }
          })
        .then(response => {
          context.dispatch('getDetailQuestion', payload.idQuestion)
        })
        .catch(err => {
          console.log(err)
        })
    },
    upAnswer (context, payload) {
      instance
        .put(`/answers/voteUp/${payload.idAnswer}`, {},{
          headers: { 'token': localStorage.getItem('token') }
        })
        .then(response => {
          context.dispatch('getDetailQuestion', payload.idQuestion)
        })
        .catch(err => {
          console.log(err)
        })
    },
    downAnswer (context, payload) {
      instance
        .put(`/answers/voteDown/${payload.idAnswer}`, {},
          {
            headers: { 'token': localStorage.getItem('token') }
          })
        .then(response => {
          context.dispatch('getDetailQuestion', payload.idQuestion)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addAnswer (context, payload) {
      instance
        .post(`/answers/add/${payload.id}`, {
          comment: payload.comment
        }, {
          headers: { 'token': localStorage.getItem('token') }
        })
        .then(response => {
          context.dispatch('getDetailQuestion', payload.id)
        })
        .catch(err => {
          console.log('error lagi')

          console.log(err)
        })
    },
    deleteAnswer (context, payload) {
      instance
        .delete(`/answers/delete/${payload.idAnswer}`,{
          headers: { 'token': localStorage.getItem('token') }
        })
        .then(response => {
          context.dispatch('getDetailQuestion', payload.idQuestion)
        })
        .catch(err => {
          console.log('err yang samaaa')
          console.log(err)
        })
    }
  }
})
