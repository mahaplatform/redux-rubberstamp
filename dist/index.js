"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Factory: function() {
        return Factory;
    },
    Singleton: function() {
        return Singleton;
    },
    combineReducers: function() {
        return combineReducers;
    }
});
var _reactRedux = require("react-redux");
var _actions = /*#__PURE__*/ _interopRequireWildcard(require("./actions"));
var _propTypes = /*#__PURE__*/ _interopRequireDefault(require("prop-types"));
var _reducer = /*#__PURE__*/ _interopRequireDefault(require("./reducer"));
var _react = /*#__PURE__*/ _interopRequireDefault(require("react"));
var _lodash = /*#__PURE__*/ _interopRequireDefault(require("lodash"));
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
var Rubberstamped = function(namespace, mapStateToProps, mapDispatchToProps, multiple) {
    return function(Component) {
        var _mapStateToProps = function(state, props) {
            var cid = props.cid;
            var path = multiple ? "".concat(namespace, ".").concat(cid) : namespace;
            var cstate = _lodash.default.get(state, path);
            return mapStateToProps(cstate, props);
        };
        var _mapDispatchToProps = function(dispatch, props) {
            var cid = props.cid;
            return Object.keys(mapDispatchToProps).reduce(function(mapped, key) {
                return _objectSpreadProps(_objectSpread({}, mapped), _defineProperty({}, key, function() {
                    var _mapDispatchToProps;
                    var args = Array.prototype.slice.call(arguments);
                    var action = (_mapDispatchToProps = mapDispatchToProps)[key].apply(_mapDispatchToProps, _toConsumableArray(args));
                    return dispatch(_objectSpread(_objectSpreadProps(_objectSpread({}, action), {
                        type: "".concat(namespace, "/").concat(action.type)
                    }), multiple ? {
                        cid: cid
                    } : {}));
                }));
            }, {});
        };
        var WrappedComponent = (0, _reactRedux.connect)(_mapStateToProps, _mapDispatchToProps)(Component);
        var _Component;
        var Rubberstamp = /*#__PURE__*/ function(_superClass) {
            "use strict";
            _inherits(Rubberstamp, _superClass);
            var _super = _createSuper(Rubberstamp);
            function Rubberstamp(props) {
                _classCallCheck(this, Rubberstamp);
                var _this;
                _this = _super.call(this, props);
                _this.state = {
                    cid: _lodash.default.random(100000, 999999).toString(36),
                    show: false
                };
                return _this;
            }
            _createClass(Rubberstamp, [
                {
                    key: "render",
                    value: function render() {
                        if (!this.state.show) return null;
                        return /*#__PURE__*/ _react.default.createElement(WrappedComponent, _extends({}, this._getWrapped()));
                    }
                },
                {
                    key: "componentDidMount",
                    value: function componentDidMount() {
                        var _props;
                        var cid = this.state.cid;
                        var args = multiple ? [
                            namespace,
                            cid
                        ] : [
                            namespace
                        ];
                        (_props = this.props).onAddComponent.apply(_props, _toConsumableArray(args));
                        this.setState({
                            show: true
                        });
                    }
                },
                {
                    key: "componentWillUnmount",
                    value: function componentWillUnmount() {
                        var _props;
                        var cid = this.state.cid;
                        var args = multiple ? [
                            namespace,
                            cid
                        ] : [
                            namespace
                        ];
                        this.setState({
                            show: false
                        });
                        (_props = this.props).onRemoveComponent.apply(_props, _toConsumableArray(args));
                    }
                },
                {
                    key: "_getWrapped",
                    value: function _getWrapped() {
                        var cid = this.state.cid;
                        return _objectSpreadProps(_objectSpread({}, _lodash.default.omit(this.props, [
                            "onAddComponent",
                            "onRemoveComponent"
                        ])), {
                            cid: cid
                        });
                    }
                }
            ]);
            return Rubberstamp;
        }(_Component = _react.default.Component);
        _defineProperty(Rubberstamp, "propTypes", {
            onAddComponent: _propTypes.default.func,
            onRemoveComponent: _propTypes.default.func
        });
        var componentMapDispatchToProps = {
            onAddComponent: _actions.addComponent,
            onRemoveComponent: _actions.removeComponent
        };
        return (0, _reactRedux.connect)(null, componentMapDispatchToProps)(Rubberstamp);
    };
};
var Builder = function(param) {
    var namespace = param.namespace, component = param.component, reducer = param.reducer, selectors = param.selectors, actions = param.actions, multiple = param.multiple;
    var mapStateToProps = function(state, props) {
        return _objectSpread({}, state, selectors ? Object.keys(selectors).reduce(function(selecedState, key) {
            return _objectSpread({}, selecedState, _lodash.default.isFunction(selectors[key]) ? _defineProperty({}, key, selectors[key](state, props)) : {});
        }, {}) : {});
    };
    var mapDispatchToProps = Object.keys(actions).reduce(function(props, action) {
        return _objectSpreadProps(_objectSpread({}, props), _defineProperty({}, "on".concat(_lodash.default.upperFirst(action)), actions[action]));
    }, {});
    var NamespacedComponent = Rubberstamped(namespace, mapStateToProps, mapDispatchToProps, multiple)(component);
    NamespacedComponent.reducer = {
        namespace: namespace,
        "function": reducer
    };
    return NamespacedComponent;
};
var Factory = function(options) {
    return Builder(_objectSpreadProps(_objectSpread({}, options), {
        multiple: true
    }));
};
var Singleton = function(options) {
    return Builder(_objectSpreadProps(_objectSpread({}, options), {
        multiple: false
    }));
};
var combineReducers = function(components) {
    return (0, _reducer.default)(components.reduce(function(reducers, component) {
        if (!component.reducer || !component.reducer.namespace) return reducers;
        return _objectSpreadProps(_objectSpread({}, reducers), _defineProperty({}, component.reducer.namespace, component.reducer.function));
    }, {}));
};
