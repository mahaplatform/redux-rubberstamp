'use strict';

var _chai = require('chai');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _action_types = require('../action_types');

var actionTypes = _interopRequireWildcard(_action_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('actions', function () {

  it('adds component without cid', function () {

    var expected = {
      type: actionTypes.ADD,
      namespace: 'one.two.three'
    };

    (0, _chai.expect)(actions.add('one.two.three')).to.be.eql(expected);
  });

  it('adds component with cid', function () {

    var expected = {
      type: actionTypes.ADD,
      namespace: 'one.two.three',
      cid: 'ay4n'
    };

    (0, _chai.expect)(actions.add('one.two.three', 'ay4n')).to.be.eql(expected);
  });

  it('removes component without cid', function () {

    var expected = {
      type: actionTypes.REMOVE,
      namespace: 'one.two.three'
    };

    (0, _chai.expect)(actions.remove('one.two.three')).to.be.eql(expected);
  });

  it('removes component with cid', function () {

    var expected = {
      type: actionTypes.REMOVE,
      namespace: 'one.two.three',
      cid: 'ay4n'
    };

    (0, _chai.expect)(actions.remove('one.two.three', 'ay4n')).to.be.eql(expected);
  });
});