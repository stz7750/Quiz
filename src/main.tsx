import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ChakraBaseProvider} from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraBaseProvider>
    <App />
  </ChakraBaseProvider>
)
