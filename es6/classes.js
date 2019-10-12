class Animal {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  speak() {
    return "Hi This is " + this.name + " and my color is " + this.color;
  }
}

const tiger = new Animal("Tiger", "White");
console.log(tiger.speak());
