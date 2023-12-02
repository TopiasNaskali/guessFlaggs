const checkCountryName = (userInput, countryName) => {
  if (userInput.toLowerCase() === countryName.toLowerCase()) {
    return "Correct! Great job!";
  } else {
    return "Incorrect! Please try again.";
  }
};

export default checkCountryName;
