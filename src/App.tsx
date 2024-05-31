import './App.css'
import RegisterApplicant from './pages/application'

function App() {

  return (
    <>

      <div className="container">
        <div className="flex justify-between align-top">
          <div className='sticky top-0 h-24'>
            <img src="./Logo-02.png" alt="alt" width={150} height={150} />
          </div>
          <div className=''>
            <RegisterApplicant />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
