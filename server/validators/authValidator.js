const allowedRoles = ["student", "company", "institution"];

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateRegister = (data) => {
  const errors = {};

  const {
    firstName,
    lastName,
    email,
    password,
    role,
  } = data;

  if (!firstName || !firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!lastName || !lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  if (!email || !email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(email.trim())) {
    errors.email = "Please provide a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!role) {
    errors.role = "Role is required";
  } else if (!allowedRoles.includes(role.toLowerCase())) {
    errors.role = "Invalid role";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLogin = (data) => {
  const errors = {};

  const { email, password } = data;

  if (!email || !email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(email.trim())) {
    errors.email = "Please provide a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export { allowedRoles };