export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number,
  ) {
  }

  calcIMC(): string {
    const result = Math.round(this.weight / (this.height * this.height));
    switch (true) {
      case (result >= 0 && result < 18): {
        return 'Underweight';
      }
      case (result >= 18 && result <= 24): {
        return 'Normal weight';
      }
      case (result >= 25 && result <= 26): {
        return 'Overweight';
      }
      case (result >= 27 && result <= 29): {
        return 'Overweight level 1';
      }
      case (result >= 30 && result <= 39): {
        return 'Overweight level 2';
      }
      case (result >= 40): {
        return 'Overweight level 3';
      }
      default: {
        return 'Invalid value';
      }
    }
  }
}