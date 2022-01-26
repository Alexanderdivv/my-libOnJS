function shuffleWord(word) {
    var shuffleWord = '';
    word = word.split('');

    while (word.length > 0){
        var number = word.length * Math.random();
        console.log(number);
        // console.log(word.length * Math.random() << 0, 1)
        shuffleWord += word.splice(word.length * Math.random(), 1);
    }
        console.log(typeof(shuffleWord));
    return shuffleWord;
}

console.log(shuffleWord('TEST'));



// for (let i = 0; i < 10; i=i2) {
//     console.log(i);
// }

// var angka = 10 * Math.random()
// console.log(parseInt(angka << 0));

// console.log(angka >> 1);



// split wordd/string
// let words = 'JAVA'
// console.log(words.split(''));


// NOTES:
// split() -> untuk memecah string menjadi array
// splice(a,b) menghapus elemen pada index a, sebanyak b
// word.length * Math.random() << 0 -> leftshift, penggunaannya disini mirip seperti mengubah bilangan float ke int