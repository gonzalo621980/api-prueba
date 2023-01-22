import validator from "validator";


export function isNull(value) {
  return (value === null || value === undefined);
}

export function isValidBoolean(value) {
  return (
    (!isNull(value) && typeof value === 'boolean')
  );
}

export function isValidString(value, allowEmpty = true) {
  return (
    (!isNull(value) && !isNull(value.length)) &&
    (allowEmpty || value.length > 0)
  );
}

export function isValidNumber(value, isPositive = false) {
  return (
    (!isNull(value) && validator.isNumeric(value)) &&
    (!isPositive || value > 0)
  );
}

export function isValidInteger(value, isPositive = false) {
  return (
    (!isNull(value) && Number.isInteger(value)) &&
    (!isPositive || value > 0)
  );
}

export function isValidFloat(value, isPositive = false) {
  return (
    (!isNull(value) && !Number(value)) &&
    (!isPositive || value > 0)
  );
}

export function isValidDate(value, NotNull = false) {
  let isValidDate = Date.parse(value);
  return (!NotNull && isNull(value) || !isNull(value) && !isNaN(isValidDate));
}

export function isValidArray(value, allowEmpty = true) {
  return (
    (!isNull(value) && Array.isArray(value)) &&
    (allowEmpty || value.length > 0)
  );
}

export function isValidEmail(value) {
  return (!isNull(value) && validator.isEmail(value));
}

export function isValidObject(value) {
  return (!isNull(value) && (typeof value === 'function' || typeof value === 'object'));
}

export function isOriginAllowed(origin, allowedOrigin) {
    if (isValidString(allowedOrigin)) {
      return origin === allowedOrigin;
    }
    else if (allowedOrigin instanceof RegExp) {
      return allowedOrigin.test(origin);
    }
    else {
      return false;
    }
}
