"use strict";

var setupGlobalErrorHandlers = require('../errorHandler');

/**
 * Sets up global error handling for the provided Debugmate instance.
 * This function hooks the global error handlers to capture uncaught exceptions and promise rejections.
 * 
 * @param {Object} debugmateInstance The Debugmate instance to set up global error handling for.
 * @returns {void}
 */
function setupErrorHandling(debugmateInstance) {
  setupGlobalErrorHandlers(debugmateInstance);
}

/**
 * Cleans up global error handling for the provided Debugmate instance.
 * This function removes the global error handlers to stop capturing errors.
 * 
 * @param {Object} debugmateI nstance The Debugmate instance to clean up global error handling for.
 * @returns {void}
 */
function cleanupErrorHandling(debugmateInstance) {
  var _debugmateInstance$er;
  (_debugmateInstance$er = debugmateInstance.errorHandlers) === null || _debugmateInstance$er === void 0 || _debugmateInstance$er.cleanupErrorHandlers();
}
module.exports = {
  setupErrorHandling: setupErrorHandling,
  cleanupErrorHandling: cleanupErrorHandling
};