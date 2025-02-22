import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Authprovider';
import Login from './components/Login';
import Home from './components/Home';
import AddTask from './components/AddTask';
import Layout from './components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UpdatedTask from './components/UpdatedTask';

// Create a Query Client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'addTask',
        element: <AddTask></AddTask>
      },
      {
        path: 'task/:id',
        element: <UpdatedTask></UpdatedTask>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
