// for (let i = 0; i < 5; i++) {
//     console.log(i);
// }
// console.log("hello");

function greeting() {
    hello();
}
function hello() {
    hi();
    console.log("Hello");
}
function hi() {
    console.log("Hai");    
}

greeting();