// const unit = {
//     attack: function(weapon) {
//         return `${weapon}으로 공격한다`;
//     }
// };

const unit = {
    attack(weapon) {
        return `${weapon}로 공격합니다.`;
    },
};

console.log(unit);
console.log(unit.attack);
console.log(unit.attack("검"));

// 대괄호 표기