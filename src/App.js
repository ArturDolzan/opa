import React from 'react'
import './App.css'
import Main from './main/main'
import { HashRouter } from 'react-router-dom'

function App() {
  return (
    
    <div >
		
      <HashRouter>
         <Main/>
      </HashRouter>

    </div>	
  );
}

export default App;
