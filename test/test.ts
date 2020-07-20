import { expect, tap } from '@pushrocks/tapbundle';
import * as smartcls from '../ts/index';

const testSmartcls = new smartcls.SmartCls();

tap.testParallel('should get namespace', async (tools) => {
  testSmartcls.run(async () => {
    testSmartcls.set('some', 'anything');
    await tools.delayFor(1000);
    expect(testSmartcls.get('some')).to.equal('anything');
    tools.delayFor(200).then(() => {
      expect(testSmartcls.get('some')).to.equal('anything');
    });
  });
});

tap.testParallel('should get namespace with other values', async (tools) => {
  testSmartcls.run(async () => {
    testSmartcls.set('some', 'otherthing');
    await tools.delayFor(500);
    expect(testSmartcls.get('some')).to.equal('otherthing');
    tools.delayFor(200).then(() => {
      expect(testSmartcls.get('some')).to.equal('otherthing');
    });
  });
});

tap.start();
