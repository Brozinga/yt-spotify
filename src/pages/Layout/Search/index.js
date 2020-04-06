import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import './style.css';

import GetInformationsMusic from '../../../services/api';
import { EventEmitter } from '../../../services/eventEmmiter';


const { ipcRenderer } = window.require('electron');

export default function Search() {

    let timer = null;
    let inputUrl = null;
    const [research, setResearch] = useState('');

    async function changeInformations(e) {
        const searchText = e.target.value;
        setResearch(searchText);

        if (timer) clearTimeout(timer);

        timer = setTimeout(async () => {
            await SearchInformations(searchText);
        }, 1000);
    }


    function handleMessage(title) {
        const message = {
            title: `Musica pronta para tocar`,
            body: `${title}`,
        };
        ipcRenderer.send('@notification/REQUEST', message);
    }

    async function SearchInformations(URL) {
        try {
            const result = await GetInformationsMusic(URL);
            handleMessage(result.items[0].snippet.title);
            EventEmitter.dispatch('musicData', { url: URL, data: result.items[0].snippet })
            setResearch('');

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="input-search">
            <FiSearch color="#666" size={16} />
            <input onChange={changeInformations} placeholder="Digite o link do Youtube para ouvir" value={research} />
        </div>
    )
}
