'use strict';

var _chai = require('chai');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_VALUE = { foo: 'bar' };

var testReducer = function testReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_VALUE;
  var action = arguments[1];


  if (action.type === 'change') {

    return {
      foo: action.value
    };
  } else {

    return state;
  }
};

var combined = (0, _reducer2.default)({ 'one.two.three': testReducer });

describe('reducer', function () {

  describe('factory componet', function () {

    it('can add component', function () {

      var action = {
        type: 'ADD_COMPONENT',
        cid: 'a1b2',
        namespace: 'one.two.three'
      };

      var state = combined(undefined, action);

      (0, _chai.expect)(state).to.be.eql({ one: { two: { three: { a1b2: { foo: 'bar' } } } } });
    });

    it('can remove component', function () {

      var state1 = { one: { two: { three: { a1b2: { foo: 'bar' } } } } };

      var action = {
        type: 'REMOVE_COMPONENT',
        cid: 'a1b2',
        namespace: 'one.two.three'
      };

      var state2 = combined(state1, action);

      (0, _chai.expect)(state2).to.be.eql({ one: { two: { three: {} } } });
    });

    it('can mutate component', function () {

      var state1 = combined(undefined, { type: 'ADD_COMPONENT', namespace: 'one.two.three', cid: 'a1b2' });

      var state2 = combined(state1, { type: 'ADD_COMPONENT', namespace: 'one.two.three', cid: 'bz45' });

      var action = {
        type: 'one.two.three/change',
        cid: 'bz45',
        value: 'baz'
      };

      var state3 = combined(state2, action);

      (0, _chai.expect)(state3).to.be.eql({ one: { two: { three: { a1b2: { foo: 'bar' }, bz45: { foo: 'baz' } } } } });
    });
  });

  describe('singleton componet', function () {

    it('can add component', function () {

      var action = {
        type: 'ADD_COMPONENT',
        namespace: 'one.two.three'
      };

      var state = combined(undefined, action);

      (0, _chai.expect)(state).to.be.eql({ one: { two: { three: { foo: 'bar' } } } });
    });

    it('can remove component', function () {

      var state1 = { one: { two: { three: { foo: 'bar' } } } };

      var action = {
        type: 'REMOVE_COMPONENT',
        namespace: 'one.two.three'
      };

      var state2 = combined(state1, action);

      (0, _chai.expect)(state2).to.be.eql({ one: { two: {} } });
    });

    it('can mutate component', function () {

      var state1 = combined(undefined, { type: 'ADD_COMPONENT', namespace: 'one.two.three' });

      var action = {
        type: 'one.two.three/change',
        value: 'baz'
      };

      var state2 = combined(state1, action);

      (0, _chai.expect)(state2).to.be.eql({ one: { two: { three: { foo: 'baz' } } } });
    });
  });
});