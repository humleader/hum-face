import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  regionsDate: [],
  userList: [],
  modal: {
    visible: false,
    currentRecord: {},
    proList: [],
    loading: false
  }
})

export default {
  state: initialState,
  reducers: {
    showModal: (state, payload = {}) => {
      return state.update('modal', modal =>
        modal.set('visible', true).set('currentRecord', im.fromJS(payload))
      )
    },
    hideModal: (state, payload) => {
      return state.update('modal', modal => modal.set('visible', false).set('loading', false))
    },
    setUserList: (state, payload) => {
      return state.set('userList', im.fromJS(payload))
    },
    setProList: (state, payload = {}) => {
      return state.update('modal', modal => modal.set('proList', im.fromJS(payload)))
    },
    setRegionsDate: (state, payload) => {
      return state.set('regionsDate', im.fromJS(payload))
    }
  },
  effects: {
    saveProCan(data, rootState) {
      return axios.post('/procan/save', data)
    },
    async getUserList(data, rootState) {
      const list = await axios.get('/user/list')
      this.setUserList(list)
      return list
    },
    async queryProName(params, rootState) {
      const data = await axios.get('/project/getprojectname', { params: params })
      this.setProList(data)
    },
    // 查询行政区域
    queryRegions(data, rootState) {
      axios.post('/regions/query').then(res => {
        this.setRegionsDate(res)
      })
    }
  }
}
