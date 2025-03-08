import * as Yup from 'yup';

const dataSchema = Yup.array().of(
  Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number()
      .positive('Age must be positive')
      .integer('Age must be an integer')
      .required('Age is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  })
);

export const validateData = async (data) => {
  try {
    await dataSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: null };
  } catch (error) {
    return { isValid: false, errors: error.errors };
  }
};