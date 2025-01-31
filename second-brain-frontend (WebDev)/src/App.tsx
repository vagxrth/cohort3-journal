import Button from './components/Button'
import Plus from '../src/components/icons/Plus'

function App() {

  return (
    <>
      <Button variant='primary' size='sm' text='Add Content' onClick={() => {}} icon={<Plus />}/>
      <Button variant='secondary' size='sm' text='Share' onClick={() => {}}/>
    </>
  )
}

export default App
