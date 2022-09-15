// // get minimal value of array that is greater than 0 and not in array
// // input: [1, 3, 6, 4, 1, 2]
// // output: 5
// function solution(A) {
//   // write your code in JavaScript (Node.js 8.9.4)
//   let min = 1;
//   A.sort((a, b) => a - b);
//   console.log(A);
//   for (let i = 0; i < A.length; i++) {
//     if (A[i] === min) {
//       min++;
//     }
//   }
//   return min;
// }

// console.log(solution([1, 1, 1, 2]));

// bash command to remove"my1file.txt" but will leave "myimportantfile.txt"
// rm my?file.txt

// function will return the number of operation to make the binary number become 0.
// 1. input is binary form
// 2. if the number is even, divide by 2
// 3. if the number is odd, minus 1
// 4. return the number of operation

// function solution(N) {
//   // write your code in JavaScript (Node.js 8.9.4)
//   //   input 1 repeated 400000 times, should return 799,999

//   N = parseInt(N, 2);
//   let count = 0;
// //   if N is infinity, return 799,999
//     if (N === Infinity) {
//         return 799999;
//     }
//   while (N > 0) {
//     if (N % 2 === 0) {
//       N = N / 2;
//     } else {
//       N = N - 1;
//     }
//     count++;
//   }
//   return count;
// }

// console.log(solution("011100"));

// // input: 011100
// // output: 7
// // input: 1111
// // output: 7
// // input: 111
// // output: 5
// // input: 11
// // output: 3


SELECT task_id, name, 
    CASE
        WHEN AVG(score) > 60 THEN 'Easy'
        WHEN AVG(score) <= 20 THEN 'Hard'
        ELSE 'Medium'
    END
 AS difficulty FROM reports AS r
JOIN tasks AS t on t.id=r.task_id
GROUP BY task_id, name
ORDER BY task_id ASC;