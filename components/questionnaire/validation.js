/**
 * @fileoverview Validation helper functions for questionnaire inputs.
 * Provides reusable validation rules for number, stepper, and boolean input types.
 */

/**
 * Validates a numeric input value.
 * @param {any} value - Input value to validate
 * @returns {boolean} True if value is a number greater than 0
 */
export const validateNumber = (value) => {
  if (value === null || value === undefined || value === "") return false;
  const numeric = Number(value);
  return !isNaN(numeric) && numeric > 0;
};

/**
 * Validates an integer input value (stepper).
 * @param {any} value - Input value to validate
 * @param {number} [min=1] - Minimum allowed value
 * @returns {boolean} True if value is an integer >= min
 */
export const validateInteger = (value, min = 1) => {
  if (value === null || value === undefined || value === "") return false;
  const numeric = Number(value);
  return Number.isInteger(numeric) && numeric >= min;
};

/**
 * Validates a boolean input value.
 * @param {any} value - Input value to validate
 * @returns {boolean} True if value is strictly true or false
 */
export const validateBoolean = (value) => {
  return value === true || value === false;
};

/**
 * General-purpose validation dispatcher.
 * @param {string} inputType - Input type string ("number", "number_int", "bool")
 * @param {any} value - Value to validate
 * @returns {boolean} True if value passes validation for the input type
 */
export const validateInput = (inputType, value) => {
  switch (inputType) {
    case "number":
      return validateNumber(value);
    case "number_int":
      return validateInteger(value);
    case "bool":
      return validateBoolean(value);
    default:
      return false;
  }
};
