'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var add = exports.add = function add(namespace, cid) {
  return _extends({
    type: 'ADD_COMPONENT',
    namespace: namespace
  }, cid ? { cid: cid } : {});
};

var remove = exports.remove = function remove(namespace, cid) {
  return _extends({
    type: 'REMOVE_COMPONENT',
    namespace: namespace
  }, cid ? { cid: cid } : {});
};