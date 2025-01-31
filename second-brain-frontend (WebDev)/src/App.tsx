import Button from './components/Button'
import Plus from '../src/components/icons/Plus'
import Share from './components/icons/Share'

function App() {

  return (
    <>
      <Button variant='primary' size='sm' text='Add Content' onClick={() => {}} icon={<Plus size='md' />}/>
      <Button variant='secondary' size='sm' text='Share' onClick={() => {}} icon={<Share size='md'/>}/>
    </>
  )
}

export default App
