import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import './index.css';
import App from './App';
import { StoreProvider } from './StoreContext';
const { RecoilRoot } = require('recoil');

const theme = createMuiTheme({
    palette: {
        primary: {
            main: teal["A200"],
        }
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <RecoilRoot>
            <StoreProvider>
                <App />
            </StoreProvider>
        </RecoilRoot>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
