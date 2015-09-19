import React from 'react';
import Hello from './Component.js';
import WhatsUp from './WhatsUp.js';
import './main.css';

main();

function main() {
  React.render(<div><Hello /><WhatsUp /></div>, document.getElementById('app'));
}
