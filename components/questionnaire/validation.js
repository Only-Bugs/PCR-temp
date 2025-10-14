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
 * @param {number} [min=0] - Minimum allowed value
 * @returns {boolean} True if value is an integer >= min
 */
export const validateInteger = (value, min = 0) => {
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
 * Validates an enum/range input value.
 * @param {any} value - Input value to validate
 * @returns {boolean} True if value is a non-empty string
 */
export const validateEnumRange = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

/**
 * Validates a select/enum input value.
 * @param {any} value - Input value to validate
 * @returns {boolean} True if value is a non-empty string
 */
export const validateSelectEnum = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

/**
 * General-purpose validation dispatcher.
 * @param {string} inputType - Input type string ("number", "number_int", "bool", "enum_range", "select_enum")
 * @param {any} value - Value to validate
 * @param {{ min?: number }} [options] - Additional validation options
 * @returns {boolean} True if value passes validation for the input type
 */
export const validateInput = (inputType, value, options = {}) => {
  switch (inputType) {
    case "number":
      return validateNumber(value);
    case "number_int":
      return validateInteger(value, options.min);
    case "bool":
      return validateBoolean(value);
    case "enum_range":
      return validateEnumRange(value);
    case "select_enum":
      return validateSelectEnum(value);
    default:
      return false;
  }
};
