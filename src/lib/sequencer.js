class Sequencer {

  constructor(sequence) {
    this.sequence = sequence
  }

  get network() { return this.sequence.network }

  chain(from, to) {

  }

  right_left(from, to) {
    let fromSequent = this.sequence.sequentFor(from)
    let toSequent   = this.sequence.sequentFor(to)

    // this.network.wire(fromSequent)
  }
}

module.exports = Sequencer
