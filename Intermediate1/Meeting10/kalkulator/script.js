function calculator() {
  // firsNumber dan secondNumber adalah variabel yang akan digunakan untuk menyimpan nilai dari inputan
  var firstNumber = parseInt(document.getElementById("number1").value);
  var secondNumber = parseInt(document.getElementById("number2").value);

  // operator matetmatika yang akan digunakan disimpan di operator
  var operator = document.getElementById("op").value;
  // hasil akan digunakan sebagai menampilkan jawaban nanti
  var result = document.getElementById("result");
  var total; // menampung hasil perhitungan

  // jika angka pertama dan kedua tidak kosong atau tidak berupa angka
  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    // maka tampilkan pesan error
    alert("Fill the form with number !");
  } else {
    //jika angka, lalu periksa hasil perhitungan dengan memeriksa operator
    if (operator == "+") {
      total = firstNumber + secondNumber;
    } else if (operator == "-") {
      total = firstNumber - secondNumber;
    } else if (operator == "x") {
      total = firstNumber * secondNumber;
    } else if (operator == "/") {
      total = firstNumber / secondNumber;
    }
  }
  // tampilkan hasil perhitungan
  result.value = total;
}
