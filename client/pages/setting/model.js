import im from 'immutable'
import axios from 'common/axios'

const getDefaultParams = () => {
  return {
    pageSize: 20,
    curPage: 1
  }
}

const initialState = im.fromJS({
  list: {
    loading: false,
    params: getDefaultParams(),
    defaultParams: getDefaultParams(),
    dataSource: []
  }
})

export default {
  state: initialState,
  reducers: {
    setUserName: (state, payload) => {
      return state.setIn(['userInfo', 'userName'], payload)
    }
  },
  effects: {
    userPage(data, rootState) {
      return axios.get('/user/page')
    },
    userUpsert(data, rootState) {
      return axios.post('/user/upsert', { ...data })
    },
    userDelete(data, rootState) {
      return axios.post('/user/delete', { ...data })
    }
  }
}
