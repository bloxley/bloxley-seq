class Hook {

  constructor(fcn, info) {
    this.fcn  = fcn
    this.info = info
  }

  notify(signal) {
    this.fcn(this.info)
  }

}

module.exports = Hook
