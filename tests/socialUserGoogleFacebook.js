export default (req, res, next) => {
  req.user = {
    id: req.body.id,
    displayName: 'Celestin Niyonsaba',
    name: { familyName: 'Niyonsaba', givenName: 'Celestin' },
    emails: [{ value: 'niyoceles3@gmail.com' }],
    photos: [
      {
        value:
          'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2158048164322418&height=50&width=50&ext=1565088705&hash=AeTmfNe52y04p7VS'
      }
    ]
  };
  next();
};
