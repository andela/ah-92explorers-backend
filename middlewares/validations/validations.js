class Validations {
  static async validateCreateUser(req, res, next) {
    const { username, email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const pwdRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

    switch (true) {
      case email === null
        || email === undefined
        || password === null
        || password === undefined
        || username === null
        || username === undefined:
        return res.status(400).json({
          error: 'A valid email, username and password are required'
        });

      case username.length < 3 || username.length > 15 || typeof username === 'number':
        return res.status(400).json({
          error: [
            'username should not have less than 3 characters',
            'username should not have more than 15 characters',
            'username should not be numeric',
            'A valid username is Explorer250'
          ]
        });

      case emailRegex.test(email) === false:
        return res.status(400).json({
          error: 'please enter a valid email address e.g martinez@yahoo.com'
        });

      case pwdRegex.test(password) === false:
        return res.status(400).json({
          error: [
            'a valid password should not be alphanumeric',
            'a valid password should be 8 characters long',
            'an example of a valid password is alphamugerwa'
          ]
        });
    }

    next();
  }

  static async validateSiginUser(req, res, next) {
    const { email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const pwdRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

    switch (true) {
      case email === null || email === undefined || password === null || password === undefined:
        return res.status(400).json({
          error: 'a valid email, username and password are required'
        });


      case pwdRegex.test(password) === false:
        return res.status(400).json({
          error: [
            'a valid password should not be alphanumeric',
            'a valid password should be 8 characters long',
            'an example of a valid password is alphamugerwa'
          ]
        });

      case emailRegex.test(email) === false:
        return res.status(400).json({
          error: 'please enter a valid email address e.g martinez@yahoo.com'
        });
    }

    next();
  }

  static async validatePasswordOnReset(req, res, next) {
    const pwdRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    if (!pwdRegex.test(req.body.password)) {
      return res.status(400).json({
        error: [
          'a valid password should not be alphanumeric',
          'a valid password should be 8 characters long',
          'an example of a valid password is alphamugerwa'
        ]
      });
    }
    next();
  }
}

export default Validations;
