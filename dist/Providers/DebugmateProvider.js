"use strict";
"use client";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDebugmateContext = exports.DebugmateProvider = exports.DebugmateContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Debugmate = require("../contexts/Debugmate");
var _ErrorBoundary = _interopRequireDefault(require("../component/ErrorBoundary"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * DebugmateContext provides access to the Debugmate state throughout the component tree.
 * This context is intended to be used by components that need access to error reporting or state
 * related to the Debugmate service.
 *
 * @type {React.Context<DebugmateState | null>}
 */
var DebugmateContext = exports.DebugmateContext = /*#__PURE__*/(0, _react.createContext)(null);

/**
 * Custom hook that returns the current Debugmate context value.
 *
 * @returns {DebugmateState} The current Debugmate context value, which holds state related to Debugmate.
 */
var useDebugmateContext = exports.useDebugmateContext = function useDebugmateContext() {
  return (0, _react.useContext)(DebugmateContext);
};

/**
 * DebugmateProvider is a React component that wraps its children with the Debugmate context and
 * an ErrorBoundary for global error handling. It manages the Debugmate state and provides
 * it to the component tree.
 *
 * @param {object} props - The properties passed to this component.
 * @param {React.ReactNode} props.children - The child components to render within the provider.
 * @param {string} props.domain - The domain for Debugmate error reporting.
 * @param {string} props.token - The token used for authentication with Debugmate.
 * @param {boolean} props.enabled - Flag to enable or disable Debugmate error handling.
 * 
 * @returns {JSX.Element} - The rendered provider and its children, wrapped in an ErrorBoundary.
 */
var DebugmateProvider = exports.DebugmateProvider = function DebugmateProvider(_ref) {
  var children = _ref.children,
    domain = _ref.domain,
    token = _ref.token,
    enabled = _ref.enabled;
  var debugmate = (0, _Debugmate.useDebugmateState)({
    domain: domain,
    token: token,
    enabled: enabled
  });
  return /*#__PURE__*/_react["default"].createElement(DebugmateContext.Provider, {
    value: debugmate
  }, /*#__PURE__*/_react["default"].createElement(_ErrorBoundary["default"], {
    domain: domain,
    token: token,
    enabled: enabled
  }, children));
};