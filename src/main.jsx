import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { UserContextProvider } from './components/web/context/user.jsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <UserContextProvider>
            <QueryClientProvider client={queryClient}>
                <ToastContainer />
                <App />
            </QueryClientProvider>
        </UserContextProvider>    
    </>
    
)
