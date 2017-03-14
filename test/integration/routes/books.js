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
    it('Should return a list of books', (done) => {
      request
        .get('/books')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.equal(defaultBook.id);
          expect(res.body[0].name).to.be.equal(defaultBook.name);
          expect(res.body[0].description).to.be.equal(defaultBook.description);

          done(err);
        });
    });
  });

  describe('GET /books/{id}', () => {
    it('Should return a books', (done) => {
      request
        .get('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.equal(defaultBook.id);
          expect(res.body.name).to.be.equal(defaultBook.name);
          expect(res.body.description).to.be.equal(defaultBook.description);

          done(err);
        });
    });
  });

  describe('POST /books', () => {
    it('Should create a book', (done) => {
      const bookPost = {
        id: 2,
        name: 'Book create via a POST',
        description: 'Book\' description.',
      };
      request
        .post('/books')
        .set('Authorization', `JWT ${token}`)
        .send(bookPost)
        .end((err, res) => {
          expect(res.body.id).to.be.equal(bookPost.id);
          expect(res.body.name).to.be.equal(bookPost.name);
          expect(res.body.description).to.be.equal(bookPost.description);

          done(err);
        });
    });
  });

  describe('PUT /books/{id}', () => {
    it('Should update a book', (done) => {
      const updatedBook = {
        id: 1,
        name: 'Updated book',
      };
      request
        .put('/books/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedBook)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
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
