import ListTable from '../components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const user = state.user
  return {
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.user
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTable)
