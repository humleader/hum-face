import { createBrowserHistory } from 'history'

import { baseURI } from 'common/config'

export default createBrowserHistory({
  basename: baseURI
})
