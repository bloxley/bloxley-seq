class Milestone {

  constructor(sequence, before, after = before) {
    this.sequence = sequence
    this.before   = before
    this.after    = after
  }

}

module.exports = Milestone
