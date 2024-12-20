"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
* @typedef {Object} User
* @property {number} id
* @property {string} name
* @property {string} email
*/
/**
* @typedef {Object} Environment
* @property {string} environment
* @property {boolean} debug
* @property {string} timezone
* @property {string} server
* @property {string} database
* @property {string} npm
*/
/**
* @typedef {Object} Request
* @property {Object} request
* @property {Object} headers
* @property {Object} query_string
* @property {string} body
*/
var Context = /*#__PURE__*/function () {
  function Context() {
    _classCallCheck(this, Context);
    this.process = {
      platform: typeof window !== 'undefined' && navigator.platform ? navigator.platform : 'unknown',
      version: typeof window !== 'undefined' && navigator.appVersion ? navigator.appVersion : 'unknown'
    };
    this.operatingSystem = this.checkOperationSystem();
  }

  /**
   * Set the error information.
   * @param {Error} error
   * @returns {Context}
   */
  return _createClass(Context, [{
    key: "setError",
    value: function setError(error) {
      this.error = error;
    }

    /**
     * Set the current request information (request, headers, query_string, body).
     * @param {Request} request
     * @returns {Context}
     */
  }, {
    key: "setRequest",
    value: function setRequest(request) {
      this.request = request;
    }

    /**
     * Set the current user information (id, name, email).
     * @param {User} user
     * @returns {Context}
     */
  }, {
    key: "setUser",
    value: function setUser(user) {
      this.user = user;
    }

    /**
     * Set the current environment information (environment, debug, timezone, server, database, npm).
     * @param {Environment} environment
     * @returns {Context}
     */
  }, {
    key: "setEnvironment",
    value: function setEnvironment(environment) {
      this.environment = environment;
    }

    /**
     * Set the process information (platform and version).
     * @param {Object} process
     * @returns {Context} The context instance.
     */
  }, {
    key: "setProcess",
    value: function setProcess(process) {
      this.process = process;
    }

    /**
     * Get the process information, or default values if not set.
     * @returns {Object}
     */
  }, {
    key: "getProcess",
    get: function get() {
      return this.process || {
        platform: 'unknown',
        version: 'unknown'
      };
    }

    /**
     * Check and return the name of the operating system.
     * @returns {string}
     */
  }, {
    key: "checkOperationSystem",
    value: function checkOperationSystem() {
      var osValue = this.getProcess.platform.toLowerCase();
      var operationalSystem = {
        'macintel': 'MacOS',
        'win32': 'Windows',
        'linux': 'Linux',
        'android': 'Android'
      };
      return operationalSystem[osValue] || 'Unknown';
    }

    /**
     * Get the combined payload with user, request, and environment information.
     * @returns {Object} The combined context information.
     */
  }, {
    key: "payload",
    value: function payload() {
      return _objectSpread(_objectSpread(_objectSpread({}, this.appUser()), this.appRequest()), this.appEnvironment());
    }

    /**
    * Get the user information if set.
    * @returns {User} User information or an empty object if not set.
    */
  }, {
    key: "appUser",
    value: function appUser() {
      return this.user ? {
        user: this.user
      } : {};
    }

    /**
     * Get the request information, including URL, method, headers, query string, and body.
     * @returns {Request} Request information.
     */
  }, {
    key: "appRequest",
    value: function appRequest() {
      var _this$request, _this$request2, _this$request3, _this$request4;
      var url = window.location.href || 'unknown';
      var queryParams = {};
      if (url !== 'unknown') {
        queryParams = this.getQueryParams();
      }
      return {
        request: {
          request: {
            url: url,
            method: ((_this$request = this.request) === null || _this$request === void 0 ? void 0 : _this$request.method) || 'GET',
            params: ((_this$request2 = this.request) === null || _this$request2 === void 0 ? void 0 : _this$request2.params) || {}
          },
          headers: ((_this$request3 = this.request) === null || _this$request3 === void 0 ? void 0 : _this$request3.headers) || {},
          query_string: queryParams,
          body: ((_this$request4 = this.request) === null || _this$request4 === void 0 ? void 0 : _this$request4.body) || ''
        }
      };
    }

    /**
     * Get the query parameters from the URL as an object.
     * @returns {Object} An object with query parameters.
     */
  }, {
    key: "getQueryParams",
    value: function getQueryParams() {
      var queryString = window.location.search.substring(1);
      var params = new URLSearchParams(queryString);
      return Object.fromEntries(params.entries());
    }

    /**
     * Get the environment information, including JavaScript, application, and system context.
     * @returns {Object} Environment information grouped into JavaScript, App, and System contexts.
     */
  }, {
    key: "appEnvironment",
    value: function appEnvironment() {
      return {
        environment: this.filterKeys([this.javascriptContext(), this.appEnvironmentVariables(), this.systemContext()])
      };
    }
  }, {
    key: "javascriptContext",
    value: function javascriptContext() {
      var _this$processInfo;
      return (_this$processInfo = this.processInfo) !== null && _this$processInfo !== void 0 && _this$processInfo.version ? {
        group: 'JavaScript',
        variables: {
          version: this.getProcess.version || 'unknown'
        }
      } : {};
    }
  }, {
    key: "appEnvironmentVariables",
    value: function appEnvironmentVariables() {
      var _this$environment, _this$environment2, _this$environment3;
      var vars = {};
      this.addIfDefined(vars, 'environment', (_this$environment = this.environment) === null || _this$environment === void 0 ? void 0 : _this$environment.environment);
      this.addIfDefined(vars, 'debug', (_this$environment2 = this.environment) === null || _this$environment2 === void 0 ? void 0 : _this$environment2.debug);
      this.addIfDefined(vars, 'timezone', (_this$environment3 = this.environment) === null || _this$environment3 === void 0 ? void 0 : _this$environment3.timezone);
      return Object.keys(vars).length ? {
        group: 'App',
        variables: vars
      } : {};
    }
  }, {
    key: "systemContext",
    value: function systemContext() {
      var _this$environment4, _this$environment5, _this$environment6, _this$request5;
      var vars = {
        os: this.operatingSystem,
        server: (_this$environment4 = this.environment) === null || _this$environment4 === void 0 ? void 0 : _this$environment4.server,
        database: (_this$environment5 = this.environment) === null || _this$environment5 === void 0 ? void 0 : _this$environment5.database,
        npm: (_this$environment6 = this.environment) === null || _this$environment6 === void 0 ? void 0 : _this$environment6.npm,
        browser: (_this$request5 = this.request) === null || _this$request5 === void 0 || (_this$request5 = _this$request5.headers) === null || _this$request5 === void 0 ? void 0 : _this$request5['user-agent']
      };
      return {
        group: 'System',
        variables: vars
      };
    }
  }, {
    key: "addIfDefined",
    value: function addIfDefined(target, key, value) {
      if (value !== undefined) {
        target[key] = value;
      }
    }

    /**
     * Filter out keys from an array of objects that have no properties.
     * @param {Array<Object>} array An array of objects to filter.
     * @returns {Array<Object>} A filtered array of objects.
     */
  }, {
    key: "filterKeys",
    value: function filterKeys(array) {
      return array.filter(function (value) {
        return Object.keys(value).length !== 0;
      });
    }
  }]);
}();
module.exports.Context = Context;