import styles from './app.css';

import {cube} from './app.js';

import DB from './localDB.js';


console.log(cube(55)); // 125

console.log('localForage ', DB.getItem('key')); 