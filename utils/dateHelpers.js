/**
 * @fileoverview Date utility helpers for tracking chart
 * Provides functions to calculate 7-day windows, format dates, and filter data
 */

const HOBART_TZ = "Australia/Hobart";

/**
 * Gets date parts in Hobart timezone
 * @param {Date} date - The date to format
 * @returns {{ year: string, month: string, day: string }}
 */
export const getDatePartsInTimeZone = (date, timeZone = HOBART_TZ) => {
  const formatter = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const partValue = (type) => parts.find((part) => part.type === type)?.value ?? "";

  return {
    year: partValue("year"),
    month: partValue("month"),
    day: partValue("day"),
  };
};

/**
 * Formats date parts to ISO string key (YYYY-MM-DD)
 * @param {{ year: string, month: string, day: string }} parts
 * @returns {string}
 */
export const formatDateKey = (parts) => `${parts.year}-${parts.month}-${parts.day}`;

/**
 * Gets start and end dates for the last N days ending today
 * @param {number} days - Number of days to include (default 7)
 * @param {Date} today - Optional end date, defaults to now
 * @returns {{ start: Date, end: Date }}
 */
export const startEndForLastNDays = (days = 7, today = new Date()) => {
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // strip time
  const start = new Date(end);
  start.setDate(end.getDate() - (days - 1));
  return { start, end };
};

/**
 * Gets start and end dates for the last 7 days ending today
 * @param {Date} today - Optional end date, defaults to now
 * @returns {{ start: Date, end: Date }}
 */
export const startEndForLast7Days = (today = new Date()) => {
  return startEndForLastNDays(7, today);
};

/**
 * Gets today's date key in Hobart timezone
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
export const getTodayDateKey = () => {
  const now = new Date();
  const parts = getDatePartsInTimeZone(now);
  return formatDateKey(parts);
};

/**
 * Creates an array of dates between start and end (inclusive)
 * @param {Date} start
 * @param {Date} end
 * @returns {Date[]}
 */
export const daysBetween = (start, end) => {
  const days = [];
  const current = new Date(start);

  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
};

/**
 * Creates date key from Date object
 * @param {Date} date
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
export const iso = (date) => {
  const parts = getDatePartsInTimeZone(date);
  return formatDateKey(parts);
};

/**
 * Formats date to short format (e.g., "Mon", "Tue")
 * @param {Date} date
 * @returns {string}
 */
export const formatShortWeekday = (date) => {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: HOBART_TZ,
    weekday: "short",
  }).format(date);
};

/**
 * Formats date to axis label format (e.g., "29 Sep")
 * @param {Date} date
 * @returns {string}
 */
export const formatAxisLabel = (date) => {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: HOBART_TZ,
    day: "numeric",
    month: "short",
  }).format(date);
};

/**
 * Formats date to long format for accessibility (e.g., "Monday, 29 September")
 * @param {Date} date
 * @returns {string}
 */
export const formatLongDate = (date) => {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: HOBART_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
};

/**
 * Filters data points to only include those within the 7-day range
 * and excludes future dates
 * @param {Array} rawPoints - Array of data points with date property
 * @param {Date} start - Start date
 * @param {Date} end - End date (today)
 * @returns {Array}
 */
export const filterPointsInRange = (rawPoints, start, end) => {
  return rawPoints.filter((p) => {
    const pointDate = new Date(p.date || p.dateKey);
    return pointDate >= start && pointDate <= end;
  });
};