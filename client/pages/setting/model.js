import im from 'immutable'
import axios from 'common/axios'
const { userInfo } = window.__config__

const initialState = im.fromJS({
  userInfo: {
    userName: localStorage.getItem('userName'),
    userAliasName: localStorage.getItem('userAliasName'),
    companyName: localStorage.getItem('companyName'),
    ...userInfo
  },
  list: []
})

export default {
  state: initialState,
  reducers: {
    setUserName: (state, payload) => {
      return state.setIn(['userInfo', 'userName'], payload)
    },
    setUserAliasName: (state, payload) => {
      return state.setIn(['userInfo', 'userAliasName'], payload)
    },
    setUserList: (state, payload) => {
      return state.set('list', im.fromJS(payload))
    },
    setcompanyName: (state, payload) => {
      return state.setIn(['userInfo', 'setcompanyName'], payload)
    }
  },
  effects: {
    login(data, rootState) {
      return axios.post('/user/login', data)
    },
    async getUserList(data, rootState) {
      const list = await axios.get('/user/list')
      this.setUserList(list)
    },
    logout(data, rootState) {
      localStorage.removeItem('_h_token')
      location.href = '/hum/login'
    }
  }
}
