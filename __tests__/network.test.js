const BloxleySeq = require('../src/bloxley_seq')

test('default threshold is 0', () => {
  let neuron = new BloxleySeq.Neuron()
  expect(neuron.threshold).toBe(0)
})

test("simple network", () => {
  let net = new BloxleySeq.Network()

  let n1 = net.addNeuron()
  let n2 = net.addNeuron()

  net.wire(n1, n2)

  expect(n2.activated).toBe(false)

  net.addTrigger(n1)()

  expect(n2.activated).toBe(true)
})
