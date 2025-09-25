/**
 * Centralized logger utility.
 * Replaces console.* usage with consistent logging methods.
 * Allows future extension (e.g., sending logs to backend or external service).
 */

const levels = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
  debug: "DEBUG",
};

function formatMessage(level, message, data) {
  const timestamp = new Date().toISOString();
  if (data !== undefined) {
    return `[${timestamp}] [${level}] ${message} | Data: ${JSON.stringify(
      data,
      null,
      2
    )}`;
  }
  return `[${timestamp}] [${level}] ${message}`;
}

const logger = {
  info: (message, data) => {
    console.log(formatMessage(levels.info, message, data));
  },
  warn: (message, data) => {
    console.warn(formatMessage(levels.warn, message, data));
  },
  error: (message, error) => {
    if (error instanceof Error) {
      console.error(
        formatMessage(levels.error, message, {
          message: error.message,
          stack: error.stack,
        })
      );
    } else {
      console.error(formatMessage(levels.error, message, error));
    }
  },
  debug: (message, data) => {
    if (__DEV__) {
      console.debug(formatMessage(levels.debug, message, data));
    }
  },
};

export default logger;
