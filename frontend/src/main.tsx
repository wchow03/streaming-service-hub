import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <div className={`bg-slate-800 min-h-screen h-full`}>
                <App/>
            </div>
        </BrowserRouter>
    </React.StrictMode>,
)
