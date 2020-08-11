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
  roleList: [],
  setRoleModal: {
    visible: false,
    record: {}
  }
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
    showSetRoleModal: (state, payload = {}) => {
      return state.update('setRoleModal', modal =>
        modal.set('visible', true).set('record', im.fromJS(payload))
      )
    },
    hideSetRoleModal: (state, payload) => {
      return state.update('setRoleModal', modal => modal.set('visible', false))
    },
    listSource: (state, payload) => {
      return state.set('listSource', im.fromJS(payload))
    },
    setRoleList: (state, payload) => {
      return state.set('roleList', im.fromJS(payload))
    },
    setParams: (state, payload) => {
      return state.set('params', im.fromJS(payload))
    }
  },
  effects: {
    async query(params, rootState) {
      const data = await axios.get('/user/page', { params })
      this.listSource(data)
      return data
    },
    async getRoleList(params, rootState) {
      const data = await axios.get('/role/list', { params })
      this.setRoleList(data)
      return data
    },
    userUpsert(data, rootState) {
      return axios.post('/user/upsert', { ...data })
    },
    userSetRole(data, rootState) {
      return axios.post('/user/setrole', { ...data })
    },
    userDelete(data, rootState) {
      return axios.post('/user/delete', { ...data })
    }
  }
}
