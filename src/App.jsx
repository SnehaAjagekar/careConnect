import { useState } from 'react'
import SupportForm from './components/SupportForm'
import Chatbot from './components/Chatbot'



function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div>
      <SupportForm/>
      <Chatbot/>
    </div>
  )
}

export default App
