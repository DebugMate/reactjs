"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DebugmateProvider", {
  enumerable: true,
  get: function get() {
    return _DebugmateProvider.DebugmateProvider;
  }
});
Object.defineProperty(exports, "ErrorBoundary", {
  enumerable: true,
  get: function get() {
    return _ErrorBoundary["default"];
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "useDebugmateContext", {
  enumerable: true,
  get: function get() {
    return _DebugmateProvider.useDebugmateContext;
  }
});
Object.defineProperty(exports, "useDebugmateState", {
  enumerable: true,
  get: function get() {
    return _Debugmate.useDebugmateState;
  }
});
var _debugmate = _interopRequireDefault(require("./debugmate"));
var _DebugmateProvider = require("./Providers/DebugmateProvider");
var _Debugmate = require("./contexts/Debugmate");
var _ErrorBoundary = _interopRequireDefault(require("./component/ErrorBoundary"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = _debugmate["default"];