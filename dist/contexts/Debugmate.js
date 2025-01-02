"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDebugmateState = void 0;
var _react = require("react");
var _debugmate = _interopRequireDefault(require("../debugmate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Hook to manage and initialize the Debugmate instance with provided configuration.
 *
 * @param {string} domain - The domain to which errors will be sent.
 * @param {string} token - The authentication token for the Debugmate API.
 * @param {boolean} enabled - Flag to enable or disable error tracking.
 * @param {Object}  user - Optional user information to associate with error reports.
 * @param {Object}  environment - Optional environment metadata to provide additional context.
 *
 * @returns {Object} The initialized Debugmate instance.
 */
var useDebugmateState = exports.useDebugmateState = function useDebugmateState(_ref) {
  var domain = _ref.domain,
    token = _ref.token,
    enabled = _ref.enabled,
    user = _ref.user,
    environment = _ref.environment;
  var debugmate = (0, _react.useMemo)(function () {
    return new _debugmate["default"]({
      domain: domain,
      token: token,
      enabled: enabled
    });
  }, [domain, token, enabled]);
  (0, _react.useEffect)(function () {
    debugmate.setupGlobalErrorHandling();
    if (user) {
      debugmate.setUser(user);
    }
    if (environment) {
      debugmate.setEnvironment(environment);
    }
    return function () {
      debugmate.cleanupGlobalErrorHandling();
    };
  }, [debugmate]);
  return debugmate;
};