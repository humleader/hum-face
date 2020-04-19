import React from 'react'
import NProgress from 'nprogress'

const Loading = ({ error }) => {
  if (error) {
    NProgress.done()

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: '10%'
        }}
      >
        <div style={{ width: 450 }} />
        <div style={{ color: '#434e59', fontSize: 50, fontWeight: 700 }}>页面咔嚓了:(</div>
      </div>
    )
  } else {
    return null
  }
}

export default Loading
