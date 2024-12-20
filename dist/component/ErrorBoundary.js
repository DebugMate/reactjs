"use strict";
'use client';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _debugmate = _interopRequireDefault(require("../debugmate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * ErrorBoundary is a React component that catches JavaScript errors in its child component tree,
 * logs them to an external service, and displays a fallback UI.
 *
 * It uses the Debugmate service to report the errors.
 *
 * @component
 * @example
 * // Example usage:
 * <ErrorBoundary domain="your-domain" token="your-token" enabled={true}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
var ErrorBoundary = /*#__PURE__*/function (_Component) {
  /**
   * Creates an instance of the ErrorBoundary component.
   *
   * @param {object} props - The properties passed to this component.
   * @param {string} props.domain - The domain for Debugmate error reporting.
   * @param {string} props.token - The token used to authenticate with Debugmate.
   * @param {boolean} props.enabled - Flag to enable or disable the Debugmate service.
   */
  function ErrorBoundary(props) {
    var _this;
    _classCallCheck(this, ErrorBoundary);
    _this = _callSuper(this, ErrorBoundary, [props]);
    _this.state = {
      hasError: false,
      error: null
    };
    var domain = props.domain,
      token = props.token,
      enabled = props.enabled;
    _this.debugmate = new _debugmate["default"]({
      domain: domain,
      token: token,
      enabled: enabled
    });
    _this.debugmate.setupGlobalErrorHandling();
    return _this;
  }

  /**
   * This lifecycle method is invoked when an error is thrown in a child component.
   * It updates the state to reflect the error.
   *
   * @param {Error} error - The error that was thrown.
   * @returns {object} - The updated state with the error information.
   */
  _inherits(ErrorBoundary, _Component);
  return _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value:
    /**
     * This lifecycle method is invoked after an error has been thrown.
     * It allows the error details to be logged and published to Debugmate.
     *
     * @param {Error} error - The error that was thrown.
     * @param {object} errorInfo - The additional error information such as the component stack.
     */
    function componentDidCatch(error, errorInfo) {
      this.setState({
        errorInfo: errorInfo
      });
      console.error("Error info:", errorInfo);
      this.debugmate.publish(error);
    }

    /**
     * Renders the component. If an error has been caught, a fallback UI is shown.
     *
     * @returns {JSX.Element} - The rendered component or fallback UI.
     */
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        var _this$state$error;
        return /*#__PURE__*/_react["default"].createElement("h1", null, "Something went wrong: ", (_this$state$error = this.state.error) === null || _this$state$error === void 0 ? void 0 : _this$state$error.message);
      }
      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true,
        error: error
      };
    }
  }]);
}(_react.Component);
var _default = exports["default"] = ErrorBoundary;