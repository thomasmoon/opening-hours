import React from 'react';
import ReactDOM from 'react-dom';
import './sharedStyles/index.scss';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// To enable service worker -> register()
serviceWorker.unregister();
