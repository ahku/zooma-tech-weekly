export class Attackable {
  name: string

  attack() {
    return `${this.name} showed the client ”the best practises.” It was mildly effective.`
  }
}

export class Defendable {
  name: string

  defend() {
    return `${this.name} curled up into the foetal position.`
  }
}

export class Evadable {
  name: string

  evade() {
    return `${this.name} took a day off.`
  }
}
