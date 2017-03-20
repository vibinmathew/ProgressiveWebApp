import styles from './app.css';

import DB from './localDB.js';

import {cube} from './app.js';

console.log(cube(55)); // 125

console.log('localForage ', DB.getItem('key')); 