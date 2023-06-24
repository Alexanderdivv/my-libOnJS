var arra = ["a", "r", "r", "a", "y"];

// for (var i = 0; i < arra.length; i++) {
//   console.log(arra[i]);
// }

[...arra].forEach((item) => {
  console.log(item);
});

// // contoh penggunaan [...arra]
// var arra2 = [...arra];
// console.log(arra2);

// // contoh penggunaan [...arra, "b", "c"]
// var arra3 = [...arra, "b", "c"];
// console.log(arra3);
