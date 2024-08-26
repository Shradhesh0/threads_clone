import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'
import { ColorModeScript } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
// define complete styling of the application
const styles ={
  global: (props)=>({
    body:{        //lightmode ,darkmode
      color:mode('gray.800','whiteAlpha.900')(props),
      bg:mode('gray.100','#101010')(props)
    }
  })
}

// intial color mode
const config ={
  initialColorMode:'dark',
  useSystemColorMode:true // user can change the color mode override above color
}

const colors ={
  gray:{
    light:'#616161',
    dark:'#1e1e1e'
  }
}

const theme = extendTheme({config,styles,colors}) ;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
    </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
