import 'babel-polyfill'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import ErrorHandler from '../../helpers/error-class'
import ValidationError from '../../helpers/validator'
import User from '../../models/user'

export const SignUpHandler = new ErrorHandler(['email', 'username', 'password', 'firstname', 'lastname'], User)

export const createuser = async (input) => {
  try {
    const errors = await SignUpHandler.validate(input);
    if (errors.passing) {
      const salt = await bcrypt.genSaltSync(10);
      input.password = await bcrypt.hash(input.password, salt);
      const user = await User.create(input);
      const payload = {
        id: user._id,
        username: user.username
      };
      const token = await jwt.sign(payload, process.env.KEY);
      return {
        firstname: user.firstname,
        _id: user._id,
        email: user.email,
        password: input.password,
        username: user.username,
        lastname: user.lastname,
        token
      };
    }
    SignUpHandler.refresh();
    throw new ValidationError(errors);
  } catch (err) {
    throw new ValidationError(err.state);
  }
};

// check if email and password . if null or undefined throw new error
export const loginuser = async (email, password) => {
  const LoginHandler = new ErrorHandler(['email', 'password']);
  try {
    const errors = await LoginHandler.validate({ email, password });
    if (errors.passing) {
      const user = await User.findOne({ email });
      if (user && bcrypt.compareSync(password, user.password)) {
        const payload = {
          id: user._id,
          username: user.username
        };
        const token = await jwt.sign(payload, process.env.KEY)
        return {
          firstname: user.firstname,
          _id: user._id,
          email: user.email,
          username: user.username,
          lastname: user.lastname,
          token
        }
      } else if (user == null) {
        LoginHandler.adderror('Sorry we dont recognize this user');
        throw new ValidationError(LoginHandler.errors);
      }
      LoginHandler.adderror('The username and password do not match fella');
      throw new ValidationError(LoginHandler.errors);
    }
    LoginHandler.refresh();
    throw new ValidationError(errors);
  } catch (err) {
    LoginHandler.refresh()
    throw new ValidationError(err.state ? err.state : { db: err.message });
  }
};

export const fetchuser = async (username) => {
  if (username && (typeof username === 'string')) {
    const user = await User.findOne({ username });
    if (user !== null) {
      return user;
    }
    throw new ValidationError({ db: 'Hey the user doesnt exist' });
  }
  throw new ValidationError({ input: 'Please send in a valid input' });
};


// export const fetchUsers = () => {
//   return new Promise((resolve, reject) => {
//     User.find
//   })
// }
