import ListTable from '../components/operation-list'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const log = state.log
  return {
    log
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.log
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)
