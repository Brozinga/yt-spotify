import React, { useState, useEffect, Fragment } from 'react'
import { FiFrown } from 'react-icons/fi';
import { EventEmitter } from '../../services/eventEmmiter';

import './style.css';
export default function Informations() {
    const [title, setTitle] = useState('');
    const [channel, setChannel] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        EventEmitter.subscribe('musicData', ({ url, data }) => {
            setTitle(data.title);
            setChannel(data.channelTitle);
            setDescription(GetFirst100Chars(data.description));
            setImage(data.thumbnails.medium.url);
        })
    })


    function GetFirst100Chars(description) {
        const result = String(description).substring(0, 100);
        return `${result} ...`;
    }

    function RenderInformations() {
        return (
            <Fragment>
                <div className="thumbnail">
                    <img src={image} alt="Thumbnail" />
                </div>
                <div className="title">
                    <small>SINGLE</small>
                    <h1>{title}</h1>
                    <h4><span>De</span> {channel}</h4>
                    <p>{description}</p>
                </div>
            </Fragment>
        )
    }

    function RenderNoInformations() {
        return (
            <div className="noselected">
                <FiFrown color="#666" size={200} />
                <h1>Nenhuma musica pesquisada!</h1>
            </div>
        )
    }

    return (

        <div className="informations">
            {title ? RenderInformations() : RenderNoInformations()}
        </div>
    )
}
