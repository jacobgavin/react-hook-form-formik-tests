import { useState } from 'react'
import {Container} from '@mui/material'
import ReactHooksForm from './ReactHooksForm'

function App() {
  const [form, setForm] = useState('react-hooks-form')

  return (
    <Container sx={{ mt: 4 }}>
      <ReactHooksForm />
    </Container>
  )
}

export default App
