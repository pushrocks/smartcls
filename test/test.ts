import { expect, tap } from 'tapbundle'
import * as smartcls from '../ts/index'
import * as smartstring from 'smartstring'

smartcls.createNamespace('myspace')
let testNamespace = smartcls.getNamespace('myspace')

tap.testParallel('should get namespace', async (tools) => {
  testNamespace.run(async () => {
    testNamespace.set('some', 'anything')
    await tools.delayFor(1000)
    expect(testNamespace.get('some')).to.equal('anything')
    tools.delayFor(200).then(() => {
      expect(testNamespace.get('some')).to.equal('anything')
    })
  })
})

tap.testParallel('should get namespace with other values', async (tools) => {
  testNamespace.run(async () => {
    testNamespace.set('some', 'otherthing')
    await tools.delayFor(500)
    expect(testNamespace.get('some')).to.equal('otherthing')
    tools.delayFor(200).then(() => {
      expect(testNamespace.get('some')).to.equal('otherthing')
    })
  })
})

tap.test('should not expose memory leak', async (tools) => {
  let testArray = []
  await tools.checkIterationLeak(async () => {
    testNamespace.run(async () => {
      let randomLargeString = smartstring.create.createRandomString('*', 10000, {})
      // testArray.push(randomLargeString) // trigger memory leak
      testNamespace.set('some', randomLargeString )
      await tools.delayFor(10)
      expect(testNamespace.get('some')).to.equal(randomLargeString)
      tools.delayFor(10).then(() => {
        expect(testNamespace.get('some')).to.equal(randomLargeString)
      })
    })
  })
})

tap.start()
