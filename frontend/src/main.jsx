import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AppContext.jsx'


ReactDom.createRoot(document.getElementById('root')).render(

    <AuthProvider>
      <App />
    </AuthProvider>
)
