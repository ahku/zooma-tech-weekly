export function FunctionComposition2() {
  // TODO: https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype

  interface SharedState {
    name: string
    energy: number
    setEnergy: (value: number) => void
    checkEnergy: () => string
  }

  const canFly = (state: SharedState) => {
    let altitude = 10
    return {
      flyHigher() {
        altitude += 2
        return `${state.name} flies higher at an altitude of ${altitude} m`
      },
      flyLower() {
        altitude -= 2
        return `${state.name} flies lower at an altitude of ${altitude} m`
      },
    }
  }
  const canBark = (state: SharedState) => {
    return {
      bark() {
        return `${state.name} said woff`
      },
    }
  }
  const canBite = (state: SharedState) => {
    return {
      bite(force = 10) {
        return `${state.name} bit someone with a force of ${force} pain points! Ouch!`
      },
    }
  }
  const canBeHurt = (state: SharedState) => {
    return {
      receiveBeating(power = 1) {
        state.setEnergy(state.energy - power)
        return `${state.name} took a beating of ${power} pain points! Ouch!`
      },
    }
  }

  const createState = (name: string, energy = 10): SharedState => {
    return {
      name,
      energy,
      setEnergy(value = 10) {
        this.energy = value
      },
      checkEnergy() {
        return `${this.name}'s energy level is ${this.energy}`
      },
    }
  }
  const CreateDog = (name: string, energy = 10) => {
    let state = createState(name, energy)
    return Object.assign(state, canBark(state), canBeHurt(state))
  }

  const CreateFantasyDog = (name: string, energy = 20) => {
    let state = createState(name, energy)
    return Object.assign(state, canBark(state), canBeHurt(state), canFly(state))
  }
  const CreateGodCreature = (name: string, energy = 100) => {
    let state = createState(name, energy)
    return Object.assign(state, canBark(state), canBeHurt(state), canFly(state))
  }

  const Fido = CreateDog('Fido')
  const Karo = CreateDog('Karo')
  const Batte = CreateFantasyDog('Batte')
  const Bitte = CreateFantasyDog('Bitte')
  const Lassie = CreateGodCreature('Lassie')
  console.log(Lassie.checkEnergy())
  console.log(Lassie.receiveBeating())
  console.log(Lassie.checkEnergy())

  console.log(Fido.bark())
  console.log(Karo.bark())
  console.log(Fido.bark())
  console.log(Karo.bark())
  console.log(Batte.flyHigher())
  console.log(Batte.flyHigher())
  console.log(Bitte.flyLower())
  console.log(Batte.flyHigher())

  console.log(Fido.receiveBeating(2))
  console.log(Fido.checkEnergy())
  console.log(Karo.receiveBeating(5))
  console.log(Karo.checkEnergy())
  console.log(Fido.checkEnergy())

  //------------------------------------------------------------------------
  //  Too dynamic
  // //------------------------------------------------------------------------
  // type AnimalBehaviour = (state: SharedState) => { [key: string]: any }
  // function createAnimal(name: string, behaviors: AnimalBehaviour[]) {
  //   return Object.assign({}, ...behaviors.map((behavior) => behavior(name)))
  // }
  // // Works, but not types
  // let Camel = createAnimal('Camelia', [canBite, canBeHurt])
  // console.log(Camel.bite(20))

  type ObjectDescriptor<D, M> = {
    data?: D
    methods?: M & ThisType<D & M> // Type of 'this' in methods is D & M
  }

  function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    let data: object = desc.data || {}
    let methods: object = desc.methods || {}
    return { ...data, ...methods } as D & M
  }

  const defineState = ({ x = 0, y = 0, energy = 10 }) => ({
    x,
    y,
    energy,
  })

  const obj = makeObject({
    data: Object.assign(defineState({ energy: 20 }), {
      flySpeed: 0,
    }),
    methods: {
      moveBy(dx: number, dy: number) {
        this.x += dx // Strongly typed this
        this.y += dy // Strongly typed this
      },
      checkEnergy() {
        return this.energy
      },
      flyFaster() {
        this.flySpeed += 20
      },
    },
  })

  obj.x = 10
  obj.y = 20
  obj.moveBy(5, 5)

  console.log(obj.checkEnergy())
}
