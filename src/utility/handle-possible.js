window.handlePossibleFunction = (value, ...callWith) => (isFunction(value) ? value(...callWith) : value);
window.handlePossibleArray = array => (Array.isArray(array) ? array : [array]);

// Array elements can be either element or [condition, ...elements]
// This function goes through the array and returns all elements that meet the condition
// If an element doesn't have a condition specified (element), it gets returned
// If an element has a condition specified and it's met, it gets returned
// If an element has a condition specified and it's not met, it doesn't get returned
window.handlePossibleConditional = function(array, force = false) {
  const results = [];
  array.forEach(el => {
    if (Array.isArray(el)) {
      // Removes the condition from the result
      if (el[0] === true || force) results.push(...el.toSpliced(0, 1));
    } else results.push(el);
  });
  return results;
};
