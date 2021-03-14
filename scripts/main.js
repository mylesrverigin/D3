import { Events } from './events.js'

const evclass = new Events();

document.addEventListener('change',event => {
    evclass.addEvent(event);
    evclass.handleclick();
})