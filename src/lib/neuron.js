class Neuron {

  constructor() {
    this.threshold   = 0
    this.downstreams = new Map()

    this.activation  = 0
    this.activated   = false
  }

  adjustThreshold(value) {
    this.threshold += value
  }

  connectTo(other, weight) {
    let signal = weight + (this.downstreams.get(other) || 0)

    this.downstreams.set(other, signal)
  }

  notify(signal) {
    this.activation += signal

    if (this.activation >= this.threshold && ! this.activated) {
      this.activated = true

      for (let [downstream, signal] of this.downstreams) {
        downstream.notify(signal)
      }
    }
  }

  separate(into) {
    [this.downstreams, into.downstreams] = [into.downstreams, this.downstreams]
  }

  reset() {
    this.activation = 0
    this.activated  = false
  }

}

module.exports = Neuron
