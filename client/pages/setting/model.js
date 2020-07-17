import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  listSource: {},
  params: {
    pageSize: 20,
    pageIndex: 1
  },
  userModal: {
    visible: false,
    record: {}
  },
  historyParams: undefined
})

export default {
  state: initialState,
  reducers: {
    showUserModal: (state, payload = {}) => {
      return state.update('userModal', modal =>
        modal.set('visible', true).set('record', im.fromJS(payload))
      )
    },
    hideUserModal: (state, payload) => {
      return state.update('userModal', modal => modal.set('visible', false))
    },
    listSource: (state, payload) => {
      return state.set('listSource', im.fromJS(payload))
    },
    setParams: (state, payload) => {
      return state.set('params', im.fromJS(payload))
    },
    setHistoryParams: (state, payload) => {
      return state.set('historyParams', im.fromJS(payload))
    },
    setUserName: (state, payload) => {
      return state.setIn(['userInfo', 'userName'], payload)
    }
  },
  effects: {
    async query(params, rootState) {
      const data = await axios.get('/user/page', { params })
      this.listSource(data)
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
