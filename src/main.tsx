// Main entry point of the app
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import './styles/toast.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AppThemeProvider from '@/context/ThemeProvider'
import ReduxProvider from '@/store/provider'
import { AuthProvider } from '@/context/AuthContext'
import { ToastContainer } from 'react-toastify'
import { LoadingProvider } from '@/context/LoadingContext'
import { NotFoundProvider } from './context/NotFound'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ReduxProvider>
          <AppThemeProvider>
            <LoadingProvider>
              <ToastContainer
                limit={3}
                position='top-right'
                autoClose={3000}
                pauseOnFocusLoss={false}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme='colored'
                icon={false}
              />
              <NotFoundProvider>
                <App />
              </NotFoundProvider>
            </LoadingProvider>
          </AppThemeProvider>
        </ReduxProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
