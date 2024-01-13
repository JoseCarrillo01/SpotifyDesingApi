import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './tailwindStyles/tailwind.css';

// Utiliza ReactDOM.render si no necesitas Concurrent Mode
ReactDOM.render(
    <React.StrictMode>
        <div>
            <Router />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);
