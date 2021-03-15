import { D3Calc } from './d3.js';
import { modifyMissing, modifySolved, modifyElementValue } from './modifydom.js';

var calc = new D3Calc();

class Events {
    // The class to filter all click events
    constructor(){
        this.event = null;
        this.reqParams = ['amps','distance','awg'];
        this.optParams = ['voltage','vdp','CIT'];
        this.optCheckboxes = ['brkr','cu'];
    }

    addEvent(event){
        // Adds event to the class
        this.event = event;
    }

    handleclick(){
        // function to do something with click
        this.id = this.getEventId();
        if (this.reqParams.includes(this.id)){
            this.handleReq();
        }else if(this.optParams.includes(this.id)){
            this.handleOptional();
        }else if(this.optCheckboxes.includes(this.id)){
            this.handleCheckboxes();
        }else{
            console.log('New event we havent seen');
        }
        // attempt run 
        let retVals = calc.run();
        if (retVals.length === 1){
            modifyElementValue(retVals[0],'distance');
            modifySolved(true,'distance');
        }else if (retVals.length === 2){
            modifyElementValue(retVals[0],'awg');
            modifySolved(true,'awg');
        }
    }

    handleReq(){
        // Handle require params using d3 class
        //check input
        modifyMissing(false,this.id)
        if (this.id == 'amps'){
            calc.setAmps(this.getEventValue());
        }else if (this.id == 'distance'){
            calc.setDistance(this.getEventValue());
        }else if (this.id == 'awg'){
            calc.setAwg(this.getEventValue());
        }else{
            console.log('thing we have never seen');
        }
    }

    handleOptional(){
        // Handle optional Params using d3 class
        if (this.id == 'voltage') {
            calc.setVoltage(this.getEventValue());
        }else if (this.id == 'vdp') {
            calc.setVdp(this.getEventValue());
        } else if (this.id == 'CIT') {
            calc.setCIT(this.getEventValue());
        }else{
            console.log('something never seen');
        }
    }

    handleCheckboxes(){
        // Handle checkboxes using d3 class
        if (this.id == 'brkr'){
            calc.breaker = this.isChecked();
        }else if (this.id == 'cu'){
            calc.cu = this.isChecked();
        }
    }

    getEventId(){
        // Returns Id of event stored in class
        return this.event.target.id;
    }

    getEventValue(){
        // returns value of current event as int
        return parseInt(this.event.target.value);
    }

    isChecked(){
        // Returns true if box is checked else false
        return this.event.target.checked;
    }
}

export { Events };
// Way to deal with awg being 0 or 00
// filter input 