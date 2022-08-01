"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _chai = require("chai");
var _actions = /*#__PURE__*/ _interopRequireWildcard(require("../actions"));
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
describe("actions", function() {
    it("adds component without cid", function() {
        var expected = {
            type: "ADD_COMPONENT",
            namespace: "one.two.three"
        };
        (0, _chai.expect)(_actions.add("one.two.three")).to.be.eql(expected);
    });
    it("adds component with cid", function() {
        var expected = {
            type: "ADD_COMPONENT",
            namespace: "one.two.three",
            cid: "ay4n"
        };
        (0, _chai.expect)(_actions.add("one.two.three", "ay4n")).to.be.eql(expected);
    });
    it("removes component without cid", function() {
        var expected = {
            type: "REMOVE_COMPONENT",
            namespace: "one.two.three"
        };
        (0, _chai.expect)(_actions.remove("one.two.three")).to.be.eql(expected);
    });
    it("removes component with cid", function() {
        var expected = {
            type: "REMOVE_COMPONENT",
            namespace: "one.two.three",
            cid: "ay4n"
        };
        (0, _chai.expect)(_actions.remove("one.two.three", "ay4n")).to.be.eql(expected);
    });
});
