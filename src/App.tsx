import { useState } from 'react'
import {Box, Button, Container, List, ListItem, Typography} from '@mui/material'
import ReactHooksForm from './ReactHooksForm'
import FormikForm from './FormikForm'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import ReactHooksFormWithProvider from './ReactHooksFormWithProvider'


function App() {
  const [form, setForm] = useState(true)
  const foo = useLocation()
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant={'h1'}>{foo.pathname}</Typography>
      <ul>
        <li>
          <Link to={'react-hooks-form'}>React hooks form</Link>
        </li>
        <li>
          <Link to={'react-hook-form-with-provider'}>React hook form with provider</Link>
        </li>
        <li>
          <Link to={'formik'}>Formik form</Link>
        </li>
      </ul>
      <Routes>
        <Route path={'react-hooks-form'} element={<ReactHooksForm />} />
        <Route path={'formik'} element={<FormikForm />} />
        <Route path={'react-hook-form-with-provider'} element={<ReactHooksFormWithProvider />} />
      </Routes>
    </Container>
  )
}

export default App
