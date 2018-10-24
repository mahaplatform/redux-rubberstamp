'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineReducers = exports.Singleton = exports.Factory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function Component(namespace, mapStateToProps, mapDispatchToProps, multiple) {

  return function (WrappedComponent) {
    var Rubberstamp = function (_React$Component) {
      _inherits(Rubberstamp, _React$Component);

      function Rubberstamp(props) {
        _classCallCheck(this, Rubberstamp);

        var _this = _possibleConstructorReturn(this, (Rubberstamp.__proto__ || Object.getPrototypeOf(Rubberstamp)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
          show: false
        };
        _this.cid = _lodash2.default.random(100000, 999999).toString(36);
        _this.wrapped = (0, _reactRedux.connect)(_this._mapStateToProps, _this._mapDispatchToProps())(WrappedComponent);
        return _this;
      }

      _createClass(Rubberstamp, [{
        key: 'render',
        value: function render() {
          return this.state.show ? _react2.default.createElement(this.wrapped, this._getWrapped()) : null;
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _props;

          var args = multiple ? [namespace, this.cid] : [namespace];
          (_props = this.props).onAddComponent.apply(_props, args);
          this.setState({ show: true });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (multiple) this.props.onRemoveComponent(namespace, this.cid);
        }
      }, {
        key: '_getWrapped',
        value: function _getWrapped() {
          var router = this.context.router;

          return _extends({}, _lodash2.default.omit(this.props, ['onAdd', 'onRemove']), {
            con: router
          });
        }
      }]);

      return Rubberstamp;
    }(_react2.default.Component);

    Rubberstamp.contextTypes = {
      router: _propTypes2.default.object
    };
    Rubberstamp.propTypes = {
      children: _propTypes2.default.any,
      onAddComponent: _propTypes2.default.func,
      onRemoveComponent: _propTypes2.default.func
    };

    var _initialiseProps = function _initialiseProps() {
      var _this2 = this;

      this._mapStateToProps = function (state, props) {
        var path = multiple ? namespace + '.' + _this2.cid : namespace;
        var cstate = _lodash2.default.get(state, path);
        return _extends({
          cid: _this2.cid
        }, cstate ? mapStateToProps(cstate, props) : {});
      };

      this._mapDispatchToProps = function () {
        var cid = _this2.cid;
        return Object.keys(mapDispatchToProps).reduce(function (mapped, key) {
          return _extends({}, mapped, _defineProperty({}, key, function () {

            var action = mapDispatchToProps[key].apply(mapDispatchToProps, _toConsumableArray(Array.prototype.slice.call(arguments)));

            return _extends({}, action, {
              type: namespace + '/' + action.type
            }, multiple ? { cid: cid } : {});
          }));
        }, {});
      };
    };

    var componentMapDispatchToProps = {
      onAdd: actions.add,
      onRemove: actions.remove
    };

    return (0, _reactRedux.connect)(null, componentMapDispatchToProps, null, { pure: false })(Rubberstamp);
  };
};

var Builder = function Builder(_ref) {
  var namespace = _ref.namespace,
      component = _ref.component,
      reducer = _ref.reducer,
      selectors = _ref.selectors,
      actions = _ref.actions,
      multiple = _ref.multiple;


  var mapStateToProps = function mapStateToProps(state, props) {
    return _extends({}, state, selectors ? Object.keys(selectors).reduce(function (selecedState, key) {
      return _extends({}, selecedState, _lodash2.default.isFunction(selectors[key]) ? _defineProperty({}, key, selectors[key](state, props)) : {});
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

    if (!component.reducer || !component.reducer.namespace) return reducers;

    return _extends({}, reducers, _defineProperty({}, component.reducer.namespace, component.reducer.function));
  }, {}));
};