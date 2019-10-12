class Animal {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  speak() {
    return `My name is ${this.name} and my color is ${this.color}`;
  }
}

class Lion extends Animal {
  constructor(name, color, role, home) {
    super(name, color);
    this.home = home;
    this.role = role;
  }
  roar() {
    return `This is ${this.name} and i'm ${this.role} of ${this.home}`;
  }
}

const lion = new Lion("Scar", "White", "King", "Black forest");
console.log(lion.roar());
