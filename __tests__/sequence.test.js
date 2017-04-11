const BloxleySeq = require('../src/bloxley_seq')

class Fuse {

  constructor() {
    this.fired = false
  }

  fire() {
    this.fired = true
  }
}

test('I can create a sequence', () => {
  let seq = new BloxleySeq.Sequence()

  expect(seq.isRunning).toBeFalsy()
  expect(seq.isFinished).toBeFalsy()
})

test('When started, it finishes right away', () => {
  let seq = new BloxleySeq.Sequence()

  seq.start()

  expect(seq.isRunning).toBeFalsy()
  expect(seq.isFinished).toBeTruthy()
})

test('When given a sequent, it starts but doesnt stop', () => {
  let seq = new BloxleySeq.Sequence()

  seq.addActiveSequent(this, () => {})

  seq.start()

  expect(seq.isRunning).toBeTruthy()
  expect(seq.isFinished).toBeFalsy()  
})

test('When given a sequent, that sequents hook is called', () => {
  let seq = new BloxleySeq.Sequence()
  let fuse = new Fuse()

  seq.addActiveSequent(fuse, () => fuse.fire())

  expect(fuse.fired).toBeFalsy()

  seq.start()

  expect(fuse.fired).toBeTruthy()
})

test('When the didStop is called, the sequence finishes', () => {
  let seq = new BloxleySeq.Sequence()

  let didStop = seq.addActiveSequent(this, () => {})

  seq.start()
  didStop()

  expect(seq.isRunning).toBeFalsy()
  expect(seq.isFinished).toBeTruthy()
})

test('Calling the didStop without starting the sequence doesnt finish', () => {
  let seq = new BloxleySeq.Sequence()

  let didStop = seq.addActiveSequent(this, () => {})

  didStop()

  expect(seq.isRunning).toBeFalsy()
  expect(seq.isFinished).toBeFalsy() 
})