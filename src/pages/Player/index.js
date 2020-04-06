import React, { useState, useRef } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolume, FiRefreshCw, FiVolumeX } from 'react-icons/fi';
import ReactPlayer from 'react-player'
import { EventEmitter } from '../../services/eventEmmiter';

import './style.css';
import { useEffect } from 'react';


export default function Player() {
    let Player = null;

    const [play, setPlay] = useState(false);
    const [loop, setLoop] = useState(false);
    const [volume, setVolume] = useState(1);
    const [urlPlay, setUrlPlay] = useState('');
    const [total, setTotal] = useState('0');
    const [muted, setMuted] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const [playProgress, setPlayProgress] = useState('0');

    useEffect(() => {
        EventEmitter.subscribe('musicData', ({ url, data }) => {
            setUrlPlay(url);
            setPlay(false);
            setPlay(true);
        })
    }, [])

    useEffect(() => {
        if(playProgress == 1) {
            setPlay(false);
        }
    }, [playProgress])


    function PlayVideo() {
        setPlay(!play);
    }

    function LoopMusic() {
        console.log(loop);
        setLoop(!loop);
    }

    function handleVolume(e) {
        setVolume(e.target.value);
    }

    function format(seconds) {
        const date = new Date(seconds * 1000)
        const hh = date.getUTCHours()
        const mm = date.getUTCMinutes()
        const ss = pad(date.getUTCSeconds())
        if (hh) {
            return `${hh}:${pad(mm)}:${ss}`
        }
        return `${mm}:${ss}`
    }

    function pad(string) {
        return ('0' + string).slice(-2)
    }

    function handleDuration(duration) {
        setTotal(duration);
    }

    function RenderVolumeButton() {

        if (volume == 0 || muted === true) {
            return (<FiVolumeX color="#FFF" size={22} />)
        }

        if (volume < 0.5) {
            return (<FiVolume color="#FFF" size={22} />)
        }
        return (<FiVolume2 color="#FFF" size={22} />)
    }

    function handleToggleMuted() {

    }

    function handleProgress({ played }) {
        if(urlPlay !== ''){
            setPlayProgress(played);
        }
    }

    function handleSeekMouseUp(e) {
        setSeeking(false);
        Player.seekTo(e.target.value)
      }

      function handleSeekMouseDown(e) {
        setSeeking(true);
      }

      function handleSeekChange(e) {
            setPlayProgress(parseFloat(e.target.value));
    }

    function handleProgress({ played }) {

        if(!seeking) {
            setPlayProgress(parseFloat(played));
        }
    }

    function handleMuted() {
        setMuted(!muted)
    }

    return (
        <main className="player-container">
            <ReactPlayer  ref={(input) => { Player = input; }} muted={muted} onSeek={handleSeekChange}  onProgress={handleProgress} onDuration={handleDuration} url={urlPlay} volume={volume} width={0} height={0} youtubeConfig={{ playerVars: { showinfo: 1 } }} playing={play} loop={loop} />
            <footer>
                <div className="container-left">
                    <div className="soundIcon">
                    <button onClick={handleMuted}>
                        {RenderVolumeButton()}
                    </button>
                    </div>
                    <div className="volume">
                        <input
                            type='range' min='0' max='1' step='0.01'
                            onChange={handleVolume}
                            value={volume} />
                    </div>
                </div>
                <div className="center">
                    <button className="play" onClick={PlayVideo} disabled={!urlPlay}>
                        {play ? <FiPause color="#FFF" size={36} /> : <FiPlay className="play" color="#FFF" size={36} />}
                    </button>
                    <div className="musicProgress">
                        <input
                            type='range' min='0' max='1' step='0.01'
                            onMouseUp={handleSeekMouseUp}
                            onChange={handleSeekChange}
                            value={playProgress} />
                    </div>
                    <div className="remaining">
                        <time dateTime={`P${Math.round(total  * (1 - playProgress))}S`}>
                            {format(total  * (1 - playProgress))}
                        </time>
                    </div>
                </div>
                <div className="container-right">
                    <div className="timer">
                        <time dateTime={`P${Math.round(total)}S`}>
                            {format(total)}
                        </time>
                    </div>
                    <button className={loop ? `loop loop-enabled` : `loop`} onClick={LoopMusic} disabled={!urlPlay}>
                        <FiRefreshCw color="#FFF" size={20} />
                    </button>
                </div>
            </footer>
        </main>
    );
}
