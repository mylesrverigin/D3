import {d3} from "./tables/tables.js";

class D3Calc {
    constructor(){
        this.distanceFinal = false;
        this.voltage = false;
        this.dcf = false;
        this.vdp = false;
        this.d3 = false;
        this.amps = false;
        this.breaker = false;
    }

    setDistance(value) {
        /* Sets value of distanceFinal 
        args:
            value: value to assign
        */
        this.distanceFinal = value;
    }

    setVoltage(value) {
        /* Sets value of voltage 
        args:
            value: value to assign
        */
        this.voltage = value;
    }

    setDcf(value) {
        /* Sets value of dcf 
        args:
            value: value to assign
        */
        this.dcf = value;
    }

    setVdp(value) {
        /* Sets value of vdp 
        args:
            value: value to assign
        */
        this.vdp = value;
    }
    setD3(value) {
        /* Sets value of d3
        args:
            value: value to assign
        */
        this.d3 = value;
    }
    setAmps(value) {
        /* Sets value of amps 
        args:
            value: value to assign
        */
        this.amps = value;
    }
    setBreaker(value) {
        /* Sets value of breaker >> is attached to breaker?
        args:
            value: (bool) value to assign
        */
        this.breaker = value;
    }

    getDistance() {
        /* gets value of distanceFinal */
        return this.distanceFinal;
    }

    getVoltage() {
        /* gets value of voltage */
        return this.voltage;
    }

    getDcf() {
        /* gets value of dcf */
        return this.dcf;
    }

    getVdp() {
        /* gets value of vdp */
        return this.vdp;
    }

    getd3() {
        /* gets value of d3 */
        return this.d3;
    }

    getAmps() {
        /* gets value of amps */
        return this.amps;
    }

    getBreaker() {
        /* gets value of breaker */
        return this.breaker;
    }

    voltageCalc() {
        /* Calculates the voltage multiplier for equation */
        return this.voltage/120;
    }

    d3row() {
        /* Calculates the row key of d3 table to use */
        if (!this.amps) {
            return false;
        }
        var firstIndex = 0;
        for (let i=0;i<d3['index'].length;i++){
            const value = d3['index'][i];
            if (value > this.amps){
                firstIndex += i;
                break;
            }
        }
        // makes d3 row key based on index lower and higher then value
        return [d3['index'][firstIndex-1],d3['index'][firstIndex]];
    }
    //  next step make the calculation using a stand in dcf
    //  when theres a working awg use a real dcf 
    // start at smallest awg and work up
}
var temp = new D3Calc();
temp.setAmps(34);
console.log(temp.d3row());