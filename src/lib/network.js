const Neuron = require('./neuron')
const Hook   = require('./hook')

class Network {

  constructor() {
    this.neurons = []
  }

  addNeuron() {
    let neuron = new Neuron()
    this.neurons.push(neuron)
    return neuron
  }

  wire(from, to, signal = 1, weight = 1) {
    from.connectTo(to, signal)
    to.adjustThreshold(weight)
  }

  reset() {
    for (let neuron of this.neurons) {
      neuron.reset()
    }
  }

  // How to communicate in:
  addTrigger(neuron, signal = 1, weight = 1) {
    neuron.adjustThreshold(weight)

    return () => neuron.notify(signal)
  }

  // How to communicate out:
  addHook(neuron, fcn, info = null) {
    let hook = new Hook(fcn, info)
    neuron.connectTo(hook, 0)
  }

}

module.exports = Network
