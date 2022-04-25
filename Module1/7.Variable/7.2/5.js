function kq(){
    debugger;
    let diemvl = Number(document.getElementById('number1').value);
    let dienhh = Number(document.getElementById('number2').value);
    let diemsh = Number(document.getElementById('number3').value);
   /* let TỔNG = diemvl+dienhh+diemsh;*/
    document.getElementById('tong').value= diemvl + dienhh + diemsh;
    let tb = (diemvl + dienhh + diemsh)/3;
    document.getElementById('tbc').value= tb;  
}