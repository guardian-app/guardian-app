const validation = {
    email: {
      presence: {
        message: "^Please enter an email address"
      },
      email: {
        message: "^Please enter a valid email address"
      }
    },
  
    password: {
      presence: {
        message: "^Please enter a password"
      },
      length: {
        minimum: 5,
        message: "^Your password must be at least 5 characters"
      }
    },

    firstname: {
      presence: {
        message: "^Please enter a firstname"
      },
      // length: {
      //   minimum: 5,
      //   message: "^Your password must be at least 5 characters"
      // }
    },

    lastname: {
      presence: {
        message: "^Please enter a lastname"
      },
      // length: {
      //   minimum: 5,
      //   message: "^Your password must be at least 5 characters"
      // }
    },

    mobile: {
      presence: {
        message: "^Please enter a mobile number"
      },
      length: {
        minimum: 10,
        maximum: 10,
        message: "^Your password must be 10 characters"
      }
    },

    relationship: {
      presence: {
        message: "^Please enter a relationship"
      },
      // length: {
      //   minimum: 5,
      //   message: "^Your password must be at least 5 characters"
      // }
    }
  }
  
  export default validation