import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashGenerator = (pwd) => {
  const hash = bcrypt.hashSync(pwd, saltRounds);
  return hash;
};

export default hashGenerator;
