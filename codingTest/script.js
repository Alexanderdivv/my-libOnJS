// Sistem penghitung uang kembalian
// Constraint Input pertama:
// Mesin hanya menerima total harga yang perlu kamu bayar dengan angka kelipatan 1.000.
// Constraint Input kedua:
// Karena Uang pecahan yang kamu bawa hanya uang 100.000an. Input angka hanya bolehkelipatan 100.000
// Constraint tambahan, input kedua harus lebih besar dari input pertama
// Output:
// Print uang kembalian yang perlu dikeluarkan dari sistem dengan jumlah pecahan tersedikit
// Uang kembalian yang tersedia:
// 100.000
// 50.000
// 20.000
// 5.000
// 1.000
// Contoh:
// 67000 100000 -> 20000, 5000, 5000, 1000, 1000, 1000
// 150000 100000 -> Tidak valid
// 4500 100000 -> Tidak valid
// 45000 150000 -> Tidak valid
// 90000 100000 -> 5000, 5000
// 5000 200000 -> 100000, 50000, 20000, 20000, 5000

function kembalian(masuk, keluar) {
  let save = [];
  let kembalian = 0;
  if (masuk < keluar && keluar % 100000 === 0) {
    kembalian = keluar - masuk;
    while (kembalian > 0) {
      if (kembalian >= 100000) {
        kembalian -= 100000;
        save.push(100000);
      } else if (kembalian >= 50000) {
        kembalian -= 50000;
        save.push(50000);
      } else if (kembalian >= 20000) {
        kembalian -= 20000;
        save.push(20000);
      } else if (kembalian >= 5000) {
        kembalian -= 5000;
        save.push(5000);
      } else if (kembalian >= 1000) {
        kembalian -= 1000;
        save.push(1000);
      } else {
        return "Tidak valid";
      }
    }
  } else {
    return "Tidak valid";
  }
  return save;
}

let masuk = 68000;
let keluar = 400000;

console.log(kembalian(masuk, keluar));
