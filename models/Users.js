import bcrypt from 'bcrypt';

export default (sequilize, DataType) => {
  const users = sequilize.define('users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.INTEGER,
      allowNUll: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataType.INTEGER,
      allowNUll: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataType.INTEGER,
      allowNUll: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.set('password', bcrypt.hashSync(user.password, salt));
      },
    },
    classMethods: {
      isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
    },
  });

  return users;
};
