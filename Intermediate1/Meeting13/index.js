// membuat objek
var car = {
    // membuat properties
    type : "Tesla",
    model : "Model 3",
    color : "White ",
    // membuat method
    sentence : function () {
        return "I Have " + this.color + this.type;
    }
}

console.log(car.sentence());
