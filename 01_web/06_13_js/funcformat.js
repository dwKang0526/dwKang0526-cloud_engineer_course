function plus(a, b) {
    console.log('두 수의 합 : ', + a + b);
}

plus(1, 2);

// javascript는 수행이 1순위가 아니라 화면을 그려지는게 목표이기 때문에 수행 중에 에러가 났다고 하더라도 화면은 그려진다.
plus(2);
plus('dd', 2);
plus('2', 3);
plus(2, 3, 3);