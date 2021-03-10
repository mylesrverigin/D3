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
}