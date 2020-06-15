import ListTable from '../components/user-list'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const setting = state.setting
  const common = state.common
  return {
    common,
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
