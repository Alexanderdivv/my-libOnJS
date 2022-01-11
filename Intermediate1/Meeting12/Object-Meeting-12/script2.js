// Kode untuk "this"

// var myVar = 50; //global <- dibuatnya diluar

// function coba(){
//   var myVar = 500; //local <- dibuatnya didalam fungsi/function
//   console.log(myVar)
// }

// coba();

// kalau ada this, dia akses yg global



// -----------------------

// function segitiga(){
//   var alas = 6;
//   var tinggi = 2;
//   return alas * tinggi;
// }

// segitiga();
// console.log(alas);


// --------------------------------
// array = nampung variabel yg tipenya sama
// objek = nampung variabel yg tipenya beda2

// var person = {
// firstName: "Ryan",
// lastName : "Alexandra",
// id       : 100600,
// fullName : function() {
//   return this.firstName + " " + this.lastName;  }
// };

// console.log(person.fullName())

// -----------------------------


// var person = {
//   firstName: "Ryan",
//   lastName: "Alexandra"
// }

// var school = {
//   firstName: "Timedoor",
//   lastName: "Academy"
// }

// function fullName(greeting){
//   return greeting + this.firstName + " " + this.lastName;
// }

// // perbedaannya, call bisa passing nilai seperti biasa (variabel biasa)
// // kalau apply, harus dibuatkan array

// console.log(fullName.call(person, "hello ")) 

// console.log(fullName.apply(school, ["hello "]))

// ---------------------------------

// // ini contoh variabel global
// var name = "Andra";

// function mySelf(){
//   // variabel lokal
//   name = "Ani";
//   console.log(name)
// }

// mySelf();


// JSON.stringify <- objek ke  string

