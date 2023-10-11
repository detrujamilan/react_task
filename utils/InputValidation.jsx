export const firstName_validation = {
  name: "firstName",
  label: "First Name",
  type: "text",
  multiType: false,
  validation: {
    required: {
      value: true,
      message: "FirstName required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const lastName_validation = {
  name: "lastName",
  label: "Last Name",
  type: "text",
  validation: {
    required: {
      value: true,
      message: "LastName required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const password_validation = {
  name: "password",
  label: "Password",
  type: "password",
  autoComplete: "current-password",
  validation: {
    required: {
      value: true,
      message: " Password is required",
    },
    minLength: {
      value: 6,
      message: "min 6 characters",
    },
  },
};

export const mobile_validation = {
  name: "mobile",
  label: "number",
  type: "text",
  id: "num",
  placeholder: "write a Mobile number",
  validation: {
    required: {
      value: true,
      message: "Mobile is required",
    },
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Mobile must contain only numeric digits",
    },
    minLength: {
      value: 10,
      message: "Mobile must be exactly 10 digits",
    },
  },
};

export const DOB_validation = {
  name: "DOB",
  type: "date",
  name:"DOB",
  validation: {
    required: {
      value: true,
      message: "Date of birth required",
    },
  },
};

export const email_validation = {
  name: "email",
  label: "Email Address",
  type: "email",
  id: "email",
  validation: {
    required: {
      value: true,
      message: "Email is  required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Invalid",
    },
  },
};
