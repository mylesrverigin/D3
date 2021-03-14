import {d3, t2, t3, dcf} from "./tables/tables.js";

export class D3Calc {
    constructor(){
        this.distanceFinal = 0;
        this.voltage = 120;
        this.dcf = 1;
        this.vdp = 3;
        this.amps = 0;
        this.breaker = true;
        this.cu = true;
        this.conInsulationTemp = 90;
        this.awg = 0;
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

    setCIT(value) {
        // Sets value of conductor insulation temp 
        this.conInsulationTemp = value;
    }

    setAwg(value) {
        // sets value of awg size
        this.awg = value;
    }

    voltageCalc() {
        /* Calculates the voltage multiplier for equation */
        return this.voltage/120;
    }

    calculateVoltage() {
        /* Takes this.voltage and divides by 120v constant */
        return this.voltage/120;
    }

    getIntialValues() {
        /* Gets the initial calculation values that are static and combines
            uses: this.voltage, this.dcf, this.vdp
        */
        const voltMultiplier = this.calculateVoltage();
        return voltMultiplier * this.dcf * this.vdp;
    }

    d3row() {
        /* Calculates the row key of d3 table to use based on this.amps
        returns: 
            int: key for d3 table row 
                else false;
        */
        if (!this.amps) {
            return false;
        }
        var firstIndex = 0;
        for (let i=0;i<d3['index'].length;i++){
            const value = d3['index'][i];
            // if d3 value is >= amps then return it 
            if (value >= this.amps){
                return value;
            }
        }
        return false;
    }

    d3missingAwgCalc() {
        /* The calculation for having a target distance and solving for AWG size 
        ret:
            num: the size of wire to use 
        */
        const baseNumbers = this.getIntialValues();
        const d3SearchValue = this.distanceFinal/baseNumbers;
        const [d3Index, d3Values] = d3[this.d3row()];
        let foundValue = false;
        let resultIdx;
        for (resultIdx=0;resultIdx<d3Values.length;resultIdx++){
            if (d3Values[resultIdx] > d3SearchValue) {
                foundValue = true;
                break;
            }
        }
        if (foundValue == false){
            console.log("Need to run parallel runs");
            return false
        }
        const awgSize = d3Index[resultIdx];
        const lowerAWG = d3Index[resultIdx-1];
        console.log(`sizes ${lowerAWG}, ${awgSize}`);
        if (this.missingAwgFinalCheck(lowerAWG,d3Values[resultIdx-1])) {
            console.log('not skipping')
            return [lowerAWG,this.calcDistance];
        }else {
            // use known working size
            this.missingAwgFinalCheck(awgSize,d3Values[resultIdx]);
            return [awgSize,this.calcDistance];
        }
    }

    missingAwgFinalCheck(awgSize,d3Value) {
        /* The final check to see if using the dcf changes calculation */
        if (typeof awgSize == 'undefined'){
            return false;
        }
        this.getdcf(awgSize); //sets dcf
        const baseValues = this.getIntialValues(); // get base values with new DCF included
        const distance = (baseValues * d3Value);
        if (distance >= this.distanceFinal){
            this.calcDistance = Math.round(distance*100)/100;
            return true;
        }
        return false;
    }

    d3missingDistanceCalc() {
        /* This calc is for when we want to solve for distance given amps and awg
        ret: 
            num: distance in meters
        */
        /// Sets Dcf and then the base values for calc
        let awg = this.awg;
        this.getdcf(awg)
        const baseNumbers = this.getIntialValues();
        // gets valid row of D3 table
        const [d3Index, d3Values] = d3[this.d3row()];
        const d3awgIndex = d3Index.indexOf(awg);
        const final = Math.round((d3Values[d3awgIndex] * baseNumbers)*100)/100;
        return [final];
    }

    getdcf(awg){
        /* Calls helper methods to determine actual dcf instead of estimate */
        const awgAmpacity = this.lookupAmpacity(awg);
        this.getloadFactor(awgAmpacity);
    }

    lookupAmpacity(awg){
        /* Looks up ampacity of wire size based on if brkr or not 
        
        args:
            awg: the wire size to lookup
            brkr: which column to look in 90 75 or 60
            cu: using cu table or al table
        */
        // if not on a brkr use 90col else 75col
        const colkey = this.breaker ? 75 : 90;
        // if cu use table 2 else table 3
        const tbl = this.cu ? t2 : t3;
        const rowidx = tbl['awg'].indexOf(awg);
        const awgAmps = tbl[colkey][rowidx];
        return awgAmps;
    }

    getloadFactor(awgAmps) {
        /*Goes to the dcf table given ampacity and awg amps 
        
        args: 
            awgAmps: the amps the cable can handle 
            this.amps: the amps of load 
        */
        console.log(awgAmps);
        // TODO when wire can't handle load go to next size up
        const loadRating = Math.ceil((this.amps/awgAmps)*100);
        let idx;
        for (idx=0;idx<dcf['index'].length;idx++){
            if (dcf['index'][idx] >= loadRating) {
                break;
            }
        }
        const rowkey = dcf['index'][idx];
        console.log(rowkey);
        this.dcf = dcf[rowkey][this.conInsulationTemp];
    }

    canRun(){
        // determines if enough info to do calculation
        if (this.amps > 0){
            if (this.awg != 0 || this.distanceFinal > 0){
                return true;
            }
        }
    }

    run() {
        /* The base run function for calculation of D3 */
        if (this.canRun() == true){
            this.dcf = 1;
            if (this.distanceFinal > 0) {
                // do type 2 calculation looking for AWG given distance
                return this.d3missingAwgCalc();
            }else {
                // do type 1 calculation looking for distance with given AWG
                return this.d3missingDistanceCalc();
            }
        }
        else {
            return false;
        }
    }
}
