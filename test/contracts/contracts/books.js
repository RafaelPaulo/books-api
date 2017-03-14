import jwt from 'jwt-simple';

describe('Routes Books', () => {
  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;

  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default Description',
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
        Books
          .destroy({ where: {} })
          .then(() => Books.create(defaultBook))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('GET /books', () => {
    const booksList = Joi.array().items(Joi.object().keys({
      id: Joi.number(),
      name: Joi.string(),
      description: Joi.string(),
      created_at: Joi.date().iso(),
      updated_at: Joi.date().iso(),
    }));

    it('Should return a list of books', (done) => {
      request
            .get('/books')
            .set('Authorization', `JWT ${token}`)
            .end((err, res) => {
              joiAssert(res.body, booksList);
              done(err);
            });
    });
  });

  describe('GET /books/{id}', () => {
    const book = Joi.object().keys({
      id: Joi.number(),
      name: Joi.string(),
      description: Joi.string(),
      created_at: Joi.date().iso(),
      updated_at: Joi.date().iso(),
    });

    it('Should return a books', (done) => {
      request
            .get('/books/1')
            .set('Authorization', `JWT ${token}`)
            .end((err, res) => {
              joiAssert(res.body, book);
              done(err);
            });
    });
  });

  describe('POST /books', () => {
    it('Should create a book', (done) => {
      const bookPost = {
        id: 2,
        name: 'Book create via a POST',
        description: 'Description of a book create via a POST',
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .post('/books')
        .set('Authorization', `JWT ${token}`)
        .send(bookPost)
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('PUT /books/{id}', () => {
    it('Should update a book', (done) => {
      const updatedBook = {
        id: 1,
        name: 'Updated book',
        description: 'Description of an updated book',
      };

      const updatedCount = Joi.array().items(1);

      request
        .put('/books/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedBook)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
          done(err);
        });
    });
  });

  describe('DELETE /books/{id}', () => {
    it('Should delete a book', (done) => {
      request
        .delete('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(204);
          done(err);
        });
    });
  });
});
