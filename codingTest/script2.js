// function displayOk(word) {
//   for (let i = 1; i <= word; i++) {
//     if (i % 3 == 0 && i % 4 == 0) {
//       console.log("OKYES");
//     } else if (i % 3 == 0) {
//       console.log("OK");
//     } else if (i % 4 == 0) {
//       console.log("YES");
//     } else {
//       console.log(i);
//     }
//   }
// }

// displayOk(15);

// check palindrome
// function isPalindrome(word) {
//   let splitedWord = word.split("");
//   let reversedWord = splitedWord.reverse();
//   let joinedWord = reversedWord.join("");
//   if (word === joinedWord) {
//     return true;
//   }
//   return false;
// }

// console.log(isPalindrome("kasur ini rusak"));

// function maxSecondNumber(arrays) {
//   let sec = 1;
//   let max = 0;
//   do {
//     max = arrays[0];
//     for (let i = 0; i < arrays.length; i++) {
//       if (max < arrays[i]) {
//         max = arrays[i];
//       }
//     }

//     // pop max number
//     arrays.splice(arrays.indexOf(max), 1);
//     sec++;
//   } while (sec <= 2);
//   return max;
// }
// console.log(maxSecondNumber([1, 2, 3, 10, 4, 5, 6, 7, 8, 9]));

// example of sql join query to show number of people in each departement
// SELECT
//   departement.name,
//   COUNT(employee.id) AS total_employee
// FROM
//   departement
//   LEFT JOIN employee ON departement.id = employee.departement_id
// GROUP BY
//   departement.id
// order by

const newObject = {
  satu: "satu",
  dua: "dua",
  tiga: true,
};
localStorage.setItem("newItem", JSON.stringify(newObject));
const getObject = localStorage.getItem("newItem");
console.log(`${getObject.satu} ${getObject.dua} ${getObject.tiga}`);
