import React, { Fragment } from 'react';
import './style.css';

import Titlebar from '../Layout/Titlebar';
import Search from '../Layout/Search';

import Player from '../Player';
import Informations from '../Informations';

import logo from '../../assets/img/Spotify-logo.png'

export default function MusicPlayer() {


  return (
    <Fragment>
      <Titlebar />
      <div className="header-search">
        <div className="logo-left">
          <section><img src={logo} alt="logo" /></section>
        </div>
        <Search />
      </div>
      <Informations />
      <Player />
    </Fragment>
  );
}
