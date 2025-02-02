import { PlusCircle, Share2 } from 'lucide-react'
import { Button } from './components/Button'

function App() {

  return (
    <div className='flex'>
      <Button variant="secondary" icon={Share2}>
        Share Brain
      </Button>
      <Button variant="primary" icon={PlusCircle}>
        Add Content
      </Button>
    </div>
  )
}

export default App
