const prompt = require("prompt-sync")();
const figlet = require("figlet");
const shorten = require("./kvira12.js");
const value = require("./kvira12.js");
const isValid = require("./kvira12.js");
const convert = require("./kvira12.js");
const gauge = require("./kvira12.js");

function test(name, result, expected) {
  if (result === expected) {
    console.log(`test passed: ${name}`);
  } else {
    console.log(`test failed: ${name}`);
    console.log(`expected: ${expected}`);
    console.log(`result: ${result}`);
  }
}

function shortenTest() {
  test("twitter => twttr", shorten("twitter"), "twttr");
  test("hello => hll", shorten("hello"), "hll");
  test("AEIOU => ''", shorten("AEIOU"), "");
}

shortenTest();

function valueTest() {
  test("hello => 0", value("hello"), 0);
  test("hola => 20", value("hola"), 20);
  test("bonjorno => 100", value("bonjorno"), 100);
}
valueTest();

function isValidTest() {
  test("d => false", isValid("d"), false);
  test("david10 => false", isValid("david10"), false);
  test("david! => false", isValid("david!"), false);
  test("s4aks => false", isValid("s4aks"), false);
  test("97aks => false", isValid("97aks"), false);
  test("s4a03 => false", isValid("s4a03"), false);
  test("s410s => false", isValid("s410s"), false);
  test("aks97 => true", isValid("aks97"), true);
}
isValidTest();

function testError(name, fn, expected) {
  try {
    fn();
    console.log(`test failed: ${name} - No error thrown`);
  } catch (error) {
    if (error.message === expected) {
      console.log(`test passed: ${name}`);
    } else {
      console.log(`test failed: ${name}`);
      console.log(`expected: ${expected}`);
      console.log(`result: ${error.message}`);
    }
  }
}

function convertTest() {
  testError(
    "3/9/5 => Invalid Format!",
    () => convert("3/9/5"),
    "Invalid Format!"
  );
  testError(
    "1.5/3 => Wrong input: numbers are not integers",
    () => convert("1.5/3"),
    "Wrong input: numbers are not integers"
  );
  testError(
    "3/0 => Number cant be devided by 0!",
    () => convert("3/0"),
    "Number cant be devided by 0!"
  );
  testError(
    "9/3 => X can't be greater than y!",
    () => convert("9/3"),
    "X can't be greater than y!"
  );
}

convertTest();

function gaugeTest() {
  test("1 => E", gauge(1), "E");
  test("99 => F", gauge(99), "F");
  test("55 => 55%", gauge(55), "55%");
}
gaugeTest();
