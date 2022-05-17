import { expect } from 'chai';
import 'mocha';
import * as test from './toHtml.test';

describe('Test Render', () => {
  // the tests container
  it('checking render markdown result', () => {
    expect(test.render).to.be.a('string');
    expect(test.parse).to.be.a('object');
  });
});
