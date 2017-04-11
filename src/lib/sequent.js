class Sequent {

  constructor(sequence, start, stop) {
    this.sequence = sequence
    this.start    = start
    this.stop     = stop

    // Wire this sequent up:
    this.sequence.network.wire(this.start.after, this.stop.before)
    this.sequence.network.wire(sequence.startNeuron, this.start.before)
    this.sequence.network.wire(this.stop.after, sequence.finishNeuron)
  }

}

module.exports = Sequent
