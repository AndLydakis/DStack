import React from 'react';
import {render} from 'react-dom';
import Generation from './components/generation'
import Dragon from './components/dragon'
import './css/index';

render(
    <div>
        <h2>DragonStack</h2>
        <Generation/>
        <Dragon/>
    </div>,
    document.getElementById("root")
);