export function ObjectComposition() {
  const canBark: { name: string; bark: () => void } = {
    name: '',
    bark() {
      console.log(`${this.name} said woff`)
    },
  }
  const canBeHurt = {
    name: '',
    energy: 10,
    receiveHit(power = 1) {
      this.energy -= power
      console.log(`${this.name} received a hit of ${power}! Ouch!`)
    },
    checkEnergy() {
      console.log(`${this.name}'s energy level is ${this.energy}`)
    },
  }

  function createAnimal(name: string, energy: number, behaviors: {}) {
    return Object.assign({
      ...behaviors,
      name,
      energy,
    })
  }

  const Fido = createAnimal('Fido', 10, { ...canBark, ...canBeHurt })
  const Karo = createAnimal('Karo', 20, { ...canBark, ...canBeHurt })
  console.log(Fido.bark(), Karo.bark())
  console.log(Fido.bark(), Karo.bark())

  Fido.receiveHit(2)
  Fido.checkEnergy()
  Karo.receiveHit(5)
  Karo.checkEnergy()
  Fido.checkEnergy()
}
