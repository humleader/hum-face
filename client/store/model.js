import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  regionsDate: [],
  userList: []
})

export default {
  state: initialState,
  reducers: {
    setUserList: (state, payload) => {
      return state.set('userList', im.fromJS(payload))
    },
    setRegionsDate: (state, payload) => {
      return state.set('regionsDate', im.fromJS(payload))
    }
  },
  effects: {
    async getUserList(data, rootState) {
      const list = await axios.get('/user/list')
      this.setUserList(list)
      return list
    },
    // 查询行政区域
    async queryRegions(params, rootState) {
      const data = await axios.get('/regions/query')
      this.setRegionsDate(data)
      return data
    }
  }
}
