import im from 'immutable'
import axios from 'common/axios'

const getDefaultParams = () => {
  return {
    pageSize: 20,
    curPage: 1
  }
}

const initialState = im.fromJS({
  listSource: {},
  params: {
    pageSize: 20,
    pageIndex: 1
  },
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
    listSource: (state, payload) => {
      return state.set('listSource', im.fromJS(payload))
    },
    setParams: (state, payload) => {
      return state.set('params', im.fromJS(payload))
    },
    setUserName: (state, payload) => {
      return state.setIn(['userInfo', 'userName'], payload)
    }
  },
  effects: {
    async query(params, rootState) {
      const data = await axios.get('/user/page', { params })
      this.listSource(data)
      this.setParams(params)
      return data
    },
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
