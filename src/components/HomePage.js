import React, { useState, useRef } from 'react'
import '../styles/home.css'

import apiClient from '../apiClient'

export default function HomePage() {
  const [count, setCount] = useState(0)
  let currentOriginalUrl = useRef('')
  let currentConvertedUrl = useRef('')

  let url = '#'
  const handleShorten = () => {
    apiClient
      .post('/shortenurl', { url: currentOriginalUrl.current.value })
      .then((response) => {
        console.log(response.data)
        currentConvertedUrl.current.value = response.data.id
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleCheckHistory = () => {
    apiClient
      .get('/urlhistory/' + currentConvertedUrl.current.value)
      .then((response) => {
        console.log(response.data)
        setCount(response.data.no_of_times_visited)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <>
      <div className="signin-form">
        <form method="post">
          <h3>Get your link shortened</h3>
          <p className="hint-text" style={{ textAlign: 'center' }}>
            You can shortened your long link into few characters
          </p>

          <div className="form-group">
            <input
              type="text"
              className="form-control input-lg"
              name="username"
              placeholder="e.g https://"
              required="required"
              ref={currentOriginalUrl}
              onChange={handleShorten}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control input-lg"
              name="username"
              placeholder="bit.ly/"
              ref={currentConvertedUrl}
              style={{ fontWeight: 'bold', fontSize: '18px' }}
            />
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-success btn-lg btn-block signup-btn"
              onClick={handleCheckHistory}
            >
              View history
            </button>
          </div>
          <div className="social-btn text-center">
            <h4>No of times visited: {count}</h4>
          </div>
        </form>
      </div>
    </>
  )
}
