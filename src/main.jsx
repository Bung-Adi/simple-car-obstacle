import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Game from './game'
import './index.css'

createRoot(document.getElementById('root')).render(
  <div className="canvas">
    <Game/>
  </div>
)
