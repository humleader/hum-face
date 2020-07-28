import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  listSource: {},
  params: {
    pageSize: 20,
    pageIndex: 1
  },
  roleModal: {
    visible: false,
    record: {}
  }
})

export default {
  state: initialState,
  reducers: {
    showRoleModal: (state, payload = {}) => {
      return state.update('roleModal', modal =>
        modal.set('visible', true).set('record', im.fromJS(payload))
      )
    },
    hideRoleModal: (state, payload) => {
      return state.update('roleModal', modal => modal.set('visible', false))
    },
    listSource: (state, payload) => {
      return state.set('listSource', im.fromJS(payload))
    },
    setParams: (state, payload) => {
      return state.set('params', im.fromJS(payload))
    }
  },
  effects: {
    async query(params, rootState) {
      const data = await axios.get('/role/page', { params })
      this.listSource(data)
      return data
    },
    roleUpsert(data, rootState) {
      return axios.post('/role/upsert', { ...data })
    },
    roleDelete(data, rootState) {
      return axios.post('/role/delete', { ...data })
    }
  }
}
