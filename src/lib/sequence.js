const Network   = require('./network')
const Milestone = require('./milestone')
const Sequent   = require('./sequent')

class Sequence {

  constructor() {
    this.sequentOwners = new Map()
    this.network       = new Network()

    this.startNeuron  = this.network.addNeuron()
    this.finishNeuron = this.network.addNeuron()
    this.network.wire(this.startNeuron, this.finishNeuron)

    this.startTrigger = this.network.addTrigger(this.startNeuron)
  }

  start() {
    this.startTrigger()
  }

  get isRunning()  { return this.startNeuron.activated && ! this.isFinished }
  get isFinished() { return this.finishNeuron.activated }

  sequentFor(owner) {
    return this.sequentOwners.get(owner)
  }

  addMilestone(before = this.network.addNeuron(), after = before) {
    return new Milestone(this, before, after)
  }

  addActiveMilestone() {
    let neuron  = this.network.addNeuron()
    let trigger = this.network.addTrigger(neuron)

    return [this.addMilestone(neuron), trigger]
  }

  addPassiveMilestone(onStart) {
    let neuron = this.network.addNeuron()
    this.network.addHook(neuron, onStart)

    return this.addMilestone(neuron)
  }

  // Has 1 hook, for when the sequent starts
  // Has 1 trigger, for when the sequent finishes
  addActiveSequent(owner, onStart) {
    let start           = this.addPassiveMilestone(onStart)
    let [stop, didStop] = this.addActiveMilestone()

    // Build it
    let sequent = new Sequent(this, start, stop)

    this.sequentOwners.set(owner ? owner : sequent, sequent)

    return didStop
  }

  sequence(fromMilestone, toMilestone, signal = 1, weight = 1) {
    
  }

}

module.exports = Sequence
