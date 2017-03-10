import bcrypt from 'bcrypt';

export default (sequilize, DataType) => {
  const Users = sequilize.define('Users', {
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
      beforeCreate: (User) => {
        const salt = bcrypt.genSaltSync();
        User.set('password', bcrypt.hashSync(User.password, salt));
      },
    },
    classMethods: {
      isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
    },
  });

  return Users;
};
