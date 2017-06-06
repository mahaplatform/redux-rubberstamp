'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.add = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _action_types = require('./action_types');

var actionTypes = _interopRequireWildcard(_action_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var add = exports.add = function add(namespace, cid) {
  return _extends({
    type: actionTypes.ADD_COMPONENT,
    namespace: namespace
  }, cid ? { cid: cid } : {});
};

var remove = exports.remove = function remove(namespace, cid) {
  return _extends({
    type: actionTypes.REMOVE_COMPONENT,
    namespace: namespace
  }, cid ? { cid: cid } : {});
};