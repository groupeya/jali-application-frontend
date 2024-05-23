import { useState } from 'react'
import './App.css'
import RegisterApplicant from './pages/application'
import Signup from './pages/signup'

function App() {

  return (
    <>
    <div className="container">
      <div className="flex justify-center align-top">
          <div className=''>
            <RegisterApplicant />
            {/* <Signup /> */}
        </div>
      </div>
    </div>

    </>
  )
}

export default App
