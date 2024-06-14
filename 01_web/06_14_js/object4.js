let id = "jamsu";
let pw = "1234";

// 
// let user = {
//     id: id,
//     pw: pw,
// }

// let user = {
//     id,
//     pw,
// }

// let user = {
//     id,
//     pw,
//     name: "1ch",
//     mobile: "010-1234-5678",
//     country: "Korea",
// }

// let user = {
//     id,
//     pw,
//     name: "1ch",
//     mobile: "010-1234-5678",
//     country: "Korea",
//     a: function(){
//         console.log("hello");
//     },
// }

let user = {
    id,
    pw,
    name: "1ch",
    mobile: "010-1234-5678",
    country: "Korea",
    a(){
        console.log("hello");
    },   
}


console.log(user);
console.log('-----------------------------------');
for(let key in user){
    console.log(`${key} : ${user[key]}`);
}