// 👉 IsEmpty
export const isEmpty = value => {
  if (value === null || value === undefined || value === '')
    return true
  
  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = value => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = arr => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = obj => obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)
export const isToday = date => {
  const today = new Date()
  
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
  /* eslint-enable */
  )
}

export const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    
    return rv;
  }, {});
};

export const generateArrayOfYears = () => {
  var max = new Date().getFullYear()
  var min = max - 5
  var years = []
  
  for (var i = max; i >= min; i--) {
    years.push(i)
  }
  
  return years
}
