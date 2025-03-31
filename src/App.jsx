import './App.css'
import Bar from './Components/Search_Bar.jsx'
import NotFoundComponent from './Components/404_component.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<Bar/>} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
