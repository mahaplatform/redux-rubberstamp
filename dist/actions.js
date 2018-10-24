'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var addComponent = exports.addComponent = function addComponent(namespace, cid) {
  return _extends({
    type: 'ADD_COMPONENT',
    namespace: namespace
  }, cid ? { cid: cid } : {});
};

var removeComponent = exports.removeComponent = function removeComponent(namespace, cid) {
  return _extends({
    type: 'REMOVE_COMPONENT',
    namespace: namespace
  }, cid ? { cid: cid } : {});
};