import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <AuthProvider>
            <Login />
          </AuthProvider>
        } />
        <Route path="/register" element={
          <AuthProvider>
            <Register />
          </AuthProvider>
        } />
        <Route path="/" element={
          <AuthProvider>
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          </AuthProvider>
        } />
        <Route path="/about" element={
          <AuthProvider>
            <PrivateRoute>
              <About />
            </PrivateRoute>
          </AuthProvider>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  )
}

export default App
