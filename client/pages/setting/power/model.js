import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  treeSource: [],
  userModal: {
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
    treeSource: (state, payload) => {
      return state.set('treeSource', im.fromJS(payload))
    }
  },
  effects: {
    async powerTree(params, rootState) {
      const data = await axios.get('/power/tree', { params })
      this.treeSource(data)
      return data
    },
    powerUpsert(data, rootState) {
      return axios.post('/power/upsert', { ...data })
    },
    powerDelete(data, rootState) {
      return axios.post('/power/delete', { ...data })
    }
  }
}
