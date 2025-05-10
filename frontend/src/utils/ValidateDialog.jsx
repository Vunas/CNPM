const validateRequiredFields = (data, requiredFields) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!data[field]) {
      errors[field] = "Not empty";
    }
  });

  return errors;
};

export default validateRequiredFields;
