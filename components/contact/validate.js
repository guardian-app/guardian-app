export const validationDictionary = {
  bool: {
    presence: {
      allowEmpty: false,
      message: "^This is required"
    }
  },

  day: {
    presence: {
      allowEmpty: false,
      message: "^This is required"
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 31,
      message: "^Must be valid"
    }
  },

  email: {
    presence: {
      allowEmpty: false,
      message: "^This is required"
    },
    email: {
      message: "^Email address must be valid"
    }
  },

  firstname: {
    presence: {
      allowEmpty: false,
      message: "^This is required"
    },
  },

  lastname: {
    presence: {
      allowEmpty: false,
      message: "^This is required"
    },
  },

  relationship: {
    presence: {
      allowEmpty: false,
      message: "^This is required"
    },
  },

  mobile: {
    presence: {
      allowEmpty: false,
      message: "^This is required"
    },

    mobile: {
      message: "^Mobile number must be valid"
    }
  },

  address: {
    presence: {
      allowEmpty: false,
      message: "^This is required"
    }
  }
};