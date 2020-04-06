import React from 'react'
import './styles.css';
import { FiX, FiMinus, FiSquare } from 'react-icons/fi';

// import icon from '../../../assets/img/spotify-icon.png';

const { ipcRenderer } = window.require('electron');

export default function index() {

    function HandleClick(FunctionName) {
        ipcRenderer.send(FunctionName);
    }

    return (
            <header className="titlebar">
                <section>
                    <button onClick={() => HandleClick("minimize")}><FiMinus color="#666" /></button>
                    <button onClick={() => HandleClick("maxmize")}><FiSquare color="#666" /></button>
                    <button onClick={() => HandleClick("close")}><FiX color="#666" /></button>
                </section>
            </header>
    )
}
