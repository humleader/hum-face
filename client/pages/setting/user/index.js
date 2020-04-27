import ListTable from '../components/user-list'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const setting = state.setting
  return {
    setting
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.setting
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)
