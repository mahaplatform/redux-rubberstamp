'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineReducers = exports.Singleton = exports.Factory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function Component(namespace, mapStateToProps, mapDispatchToProps, multiple) {

  return function (WrappedComponent) {
    var Component = function (_React$Component) {
      _inherits(Component, _React$Component);

      function Component(props) {
        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

        _this._mapStateToProps = function (state) {
          var path = multiple ? namespace + '.' + _this.cid : namespace;
          var cstate = _lodash2.default.get(state, path);
          return _extends({}, cstate ? mapStateToProps(cstate) : {});
        };

        _this._mapDispatchToProps = function () {
          var cid = _this.cid;
          return Object.keys(mapDispatchToProps).reduce(function (mapped, key) {
            return _extends({}, mapped, _defineProperty({}, key, function () {

              var action = mapDispatchToProps[key].apply(mapDispatchToProps, _toConsumableArray(Array.prototype.slice.call(arguments)));

              return _extends({}, action, {
                type: namespace + '/' + action.type
              }, multiple ? { cid: cid } : {});
            }));
          }, {});
        };

        _this.state = {
          show: false
        };
        _this.cid = _lodash2.default.random(100000, 999999).toString(36);
        return _this;
      }

      _createClass(Component, [{
        key: 'render',
        value: function render() {
          var show = this.state.show;

          var Wrapped = (0, _reactRedux.connect)(this._mapStateToProps, this._mapDispatchToProps())(WrappedComponent);
          return show ? _react2.default.createElement(Wrapped, this.props) : null;
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _props;

          var args = multiple ? [namespace, this.cid] : [namespace];
          (_props = this.props).onAdd.apply(_props, args);
          this.setState({ show: true });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var _props2;

          var args = multiple ? [namespace, this.cid] : [namespace];
          (_props2 = this.props).onRemove.apply(_props2, args);
        }
      }]);

      return Component;
    }(_react2.default.Component);

    var componentMapDispatchToProps = {
      onAdd: actions.add,
      onRemove: actions.remove
    };

    return (0, _reactRedux.connect)(null, componentMapDispatchToProps)(Component);
  };
};

var Builder = function Builder(_ref) {
  var namespace = _ref.namespace,
      component = _ref.component,
      reducer = _ref.reducer,
      selectors = _ref.selectors,
      actions = _ref.actions,
      multiple = _ref.multiple;


  var mapStateToProps = function mapStateToProps(state) {
    return _extends({}, state, selectors ? Object.keys(selectors).reduce(function (selecedState, key) {
      return _extends({}, selecedState, _defineProperty({}, key, selectors[key](state)));
    }, {}) : {});
  };

  var mapDispatchToProps = Object.keys(actions).reduce(function (props, action) {
    return _extends({}, props, _defineProperty({}, 'on' + _lodash2.default.upperFirst(action), actions[action]));
  }, {});

  var NamespacedComponent = Component(namespace, mapStateToProps, mapDispatchToProps, multiple)(component);

  NamespacedComponent.reducer = {
    namespace: namespace,
    'function': reducer
  };

  return NamespacedComponent;
};

var Factory = exports.Factory = function Factory(options) {

  return Builder(_extends({}, options, {
    multiple: true
  }));
};

var Singleton = exports.Singleton = function Singleton(options) {

  return Builder(_extends({}, options, {
    multiple: false
  }));
};

var combineReducers = exports.combineReducers = function combineReducers(components) {
  return (0, _reducer2.default)(components.reduce(function (reducers, component) {
    return _extends({}, reducers, _defineProperty({}, component.reducer.namespace, component.reducer.function));
  }, {}));
};