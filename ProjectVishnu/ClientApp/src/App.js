import React, { Component } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import './custom.css';
import { Funcionarios } from "./components/Funcionarios";
import { Obras } from "./components/Obras";
import { Home } from "./components/Home";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/funcionarios',
      element: <Funcionarios />
      },
    {
      path: '/obras',
      element: <Obras />
    }
])

export function App() {

  console.log(router)

  return(
    <RouterProvider router = {router}>
      
    </RouterProvider>
  )
}

