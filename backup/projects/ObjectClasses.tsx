/**
 * @param {string} text A string, containing only ASCII characters, at least one of them is a digit.
 * @return {number} One integer, representing the letter count divided by the digit count.
 */
function divideChars(text) {
  // Check the length constraint
  if (text.length < 1 || text.length > 255) {
    console.error("Text length must be between 1 and 255 characters.");
    return 0; // or handle the error as needed
  }

  // Check if the text contains only digits
  if (!/^[0-9]+$/.test(text)) {
    console.error("Text must contain only digits (0-9).");
    return 0; // or handle the error as needed
  }

  let letterCount = 0; // This will always be 0 due to the digit-only constraint
  let digitCount = text.length; // Since the text contains only digits, digitCount is the length of the text

  if (digitCount === 0) {
    console.error("No digits found in the text");
    return 0; // or handle the error as needed
  }

  const result = letterCount / digitCount;
  return Math.round(result);
}

// Example usage:
console.log(divideChars("123456")); // Output: 0 (0 letters / 6 digits)
console.log(divideChars("9876543210")); // Output: 0 (0 letters / 10 digits)
console.log(divideChars("123")); // Output: 0 (0 letters / 3 digits)
