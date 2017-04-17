'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _action_types = require('./action_types');

var actionTypes = _interopRequireWildcard(_action_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (reducers) {

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];


    if (action.type === actionTypes.ADD) {

      return _extends({}, _lodash2.default.set(state, action.namespace + '.' + action.cid, reducers[action.namespace](undefined, action)));
    } else if (action.type === actionTypes.REMOVE) {

      return _extends({}, _lodash2.default.omit(state, action.namespace + '.' + action.cid));
    } else {
      var _action$type$split = action.type.split('/'),
          _action$type$split2 = _slicedToArray(_action$type$split, 2),
          namespace = _action$type$split2[0],
          action_type = _action$type$split2[1];

      var path = action.cid ? namespace + '.' + action.cid : namespace;

      var caction = _extends({}, action, {
        type: action_type
      });

      if (!reducers[namespace]) {
        return state;
      }

      return _extends({}, _lodash2.default.set(state, path, reducers[namespace](_lodash2.default.get(state, path), caction)));
    }
  };
};