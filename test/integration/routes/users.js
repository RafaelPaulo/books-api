import jwt from 'jwt-simple';

describe('Routes Users', () => {
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'test@mail.com',
    password: 'test',
  };

  let token;

  beforeEach((done) => {
    Users
        .destroy({ where: {} })
        .then(() => Users.create({
          name: 'John',
          email: 'john@mail.com',
          password: '12345',
        }))
        .then((user) => {
          Users.create(defaultUser)
            .then(() => {
              token = jwt.encode({ id: user.id }, jwtSecret);
              done();
            });
        });
  });

  describe('GET /users', () => {
    it('Should return a list of users', (done) => {
      request
        .get('/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.equal(defaultUser.id);
          expect(res.body[0].name).to.be.equal(defaultUser.name);
          expect(res.body[0].email).to.be.equal(defaultUser.email);

          done(err);
        });
    });
  });

  describe('GET /users/{id}', () => {
    it('Should return a users', (done) => {
      request
        .get('/users/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.equal(defaultUser.id);
          expect(res.body.name).to.be.equal(defaultUser.name);
          expect(res.body.email).to.be.equal(defaultUser.email);

          done(err);
        });
    });
  });

  describe('POST /users', () => {
    it('Should create a user', (done) => {
      const newUser = {
        id: 2,
        name: 'User create via a POST',
        email: 'new_user@mail.com',
        password: 'test',
      };
      request
        .post('/users')
        .set('Authorization', `JWT ${token}`)
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.equal(newUser.id);
          expect(res.body.name).to.be.equal(newUser.name);
          expect(res.body.email).to.be.equal(newUser.email);

          done(err);
        });
    });
  });

  describe('PUT /users/{id}', () => {
    it('Should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'Updated user',
        email: 'updated@mail.com',
      };
      request
        .put('/users/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('DELETE /users/{id}', () => {
    it('Should delete a user', (done) => {
      request
        .delete('/users/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(204);
          done(err);
        });
    });
  });
});
