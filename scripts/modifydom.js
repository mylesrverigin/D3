export function modifyMissing(setActive,id){
    // Adds or removes --missing class based on input
    if (setActive == true){
        document.getElementById(id).classList.add('--missing');
    }else {
        document.getElementById(id).classList.remove('--missing');
    }
    
}

export function modifySolved(setActive,id){
    // Adds or removes --solved class based on input
    if (setActive == true){
        document.getElementById(id).classList.add('--solved');
    }else {
        document.getElementById(id).classList.remove('--solved');
    }
    
}

export function modifyElementValue(value,id){
    document.getElementById(id).value = value;
}