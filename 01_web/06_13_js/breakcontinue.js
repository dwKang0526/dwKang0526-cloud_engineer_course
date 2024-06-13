let dan = 2;
while(dan < 10) {
    let num = 1;
    while(num < 10) {
        // 6단 제외
        if(dan == 6 && num == 1) {
            break;
        }
        console.log(dan + ' * ' + num + ' = ' + dan * num);
        alert(dan + ' * ' + num + ' = ' + dan * num);
        num++;
    }
    dan++;
}