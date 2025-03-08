import * as Yup from 'yup';

/**
 * Validates the data against an optional schema.
 * If no schema is provided, performs a basic check to ensure data is an array of objects.
 * @param {Array<Object>} data - The data to validate.
 * @param {Yup.Schema} [schema] - Optional Yup schema to validate against.
 * @returns {Promise<{isValid: boolean, errors: string[] | null}>}
 */
export const validateData = async (data, schema = null) => {
  if (schema) {
    // Validate against the provided schema using Yup
    try {
      await schema.validate(data, { abortEarly: false });
      return { isValid: true, errors: null };
    } catch (error) {
      return { isValid: false, errors: error.errors };
    }
  } else {
    // Basic check: ensure data is an array of objects
    if (!Array.isArray(data) || !data.every(item => typeof item === 'object' && item !== null)) {
      return { isValid: false, errors: ['Data must be an array of objects'] };
    }
    return { isValid: true, errors: null };
  }
};