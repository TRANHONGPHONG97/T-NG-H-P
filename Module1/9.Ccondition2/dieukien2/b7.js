    function kq(){
        // debugger;
        let numA = Number(document.getElementById('number1').value);
        let numB = Number(document.getElementById('number2').value);
        let numC = Number(document.getElementById('number3').value);
        let delta = numB*numB - (4*numA*numC);
        let x1 = (-numB + Math.sqrt(delta))/(2*numA);
        let x2 = (-numB - Math.sqrt(delta))/(2*numA);
        let x = -numB/2*numA
        if (numA == 0) {
            alert('day khong phai la ham bac hai!');
        } else if (delta == 0) {
            document.getElementById('number').value = x;
        } else if (delta > 0) {
            document.getElementById('number').value = x1;
            document.getElementById('number').value = x2;
        }else {
            alert('phương trình vô nghiệm!');
        }
    }
