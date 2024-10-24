// console.log("Hello Programmer")

// function randomNum(min, max) {
// return Math.floor(Math.random() * (max - min + 1) + min);
// }

// console.log(randomNum(100, 110));

// function randomNum() {
// return Math.floor(Math.random() * 4);
// }

// console.log(randomNum());

// const converttonum = ((str)=> parseInt(str));
// var num = converttonum("77");
// console.log(num);

// const cond = ((str)=>str === "world" ? "No" : "Ok");
// console.log(cond("hello"));


// let x = null;
// let y = x ?? 5;
// console.log(y);



/////////////////...
// function makeClass() {
// class Temperature {
// constructor(temp) {
// this._temp = temp;
// }
  
// get temperature() {
// return this._temp;
// }
  
// set temperature(newTemp) {
// if (typeof newTemp === 'number') {
// this._temp = newTemp;
// } else {
// console.error('Temperature must be number');
// }
// }
  
// toCelsius() {
// return ((this._temp - 32) * 5) / 9;
// }

// }
// return Temperature;
// }
  
// const TempClass = makeClass();
// const heat = new TempClass(77);
// heat.temperature = 78;
// console.log(`temperature in Fahrenheit: ${heat.temperature}`);
// console.log(`Temperature in Celsius: ${heat.toCelsius()}`); 