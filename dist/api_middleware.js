'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _rest = require('./rest');

var _rest2 = _interopRequireDefault(_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (store) {
  return function (next) {
    return function (action) {

      if (action.type !== 'API_REQUEST') {
        return next(action);
      }

      var namespace = action.namespace;

      var params = action.params || {};

      var token = action.token || params.token;

      var headers = _extends({
        'Content-Type': 'application/json'
      }, action.headers ? action.headers : {});

      var method = action.method.toUpperCase() || 'GET';

      var path = action.params && method === 'GET' ? action.endpoint + '?' + _qs2.default.stringify(options.params) : action.endpoint;

      var entity = action.params && method !== 'GET' ? action.params : null;

      var request = _lodash2.default.omitBy({ headers: headers, method: method, path: path, entity: entity }, _lodash2.default.isNil);

      store.dispatch({
        type: namespace + '/' + action.request,
        cid: action.cid,
        request: request
      });

      var success = function success(json) {

        store.dispatch(_extends({
          type: namespace + '/' + action.success,
          cid: action.cid
        }, action.meta, json));
      };

      var failure = function failure(response) {

        store.dispatch(_extends({
          type: namespace + '/' + action.failure,
          cid: action.cid
        }, action.meta, response.entity));
      };

      return (0, _rest2.default)({ headers: headers, method: method, path: path, entity: entity }).then(function (response) {
        return response.entity;
      }).then(success, failure);
    };
  };
};