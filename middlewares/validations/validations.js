class Validations {
  static async validateCreateUser(req, res, next) {
    const { username, email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const pwdRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

    switch (true) {
<<<<<<< HEAD
      case email == null || email === undefined || password == null || password === undefined
      || username == null || username === undefined:
=======
      case email === null || email === undefined || password === null || password === undefined
      || username === null || username === undefined:
>>>>>>> 0baf1fec9d3a6183797cf1a351e76dd7ac062b13
        return res.status(400).json({
          error: 'a valid email, username and password are required'
        });
        break;

      case username.length < 3 || username.length > 15 || typeof username === 'number':
        return res.status(400).json({
          error: [
            'username should have more than 2 characters',
            'username should not have more than 15 characters',
            'username should not be numeric',
            'example of a valid username is alpha123'
          ]
        });
        break;

      case emailRegex.test(email) === false:
        return res.status(400).json({
          error: 'please enter a valid email address e.g martinez@yahoo.com'
        });
        break;

      case pwdRegex.test(password) === false:
        return res.status(400).json({
          error: [
            'a valid password should not be alphanumeric',
            'a valid password should be 8 characters long',
            'an example of a valid password is alphamugerwa'
          ]
        });
        break;
    }

    next();
  }
}

export default Validations;
