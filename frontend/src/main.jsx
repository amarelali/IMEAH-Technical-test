import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import { Provider } from 'react-redux';
import { store } from './app/store';
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>,
)
