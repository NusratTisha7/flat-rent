export const roomNo=()=>{
    var arr = [];
    for (let i = 1; i <= 5; i++) {
        arr.push(<option>{i}</option>)
    }
    return arr; 
}
export const floorNo=()=>{
    var arr = [];
    for (let i = 1; i <= 20; i++) {
        arr.push(<option>{i}</option>)
    }
    return arr; 
}