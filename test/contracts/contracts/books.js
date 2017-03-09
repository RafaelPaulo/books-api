describe('Routes Books', () => {
  const Books = app.datasource.models.Books;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
  };

  beforeEach((done) => {
    Books
        .destroy({ where: {} })
        .then(() => Books.create(defaultBook))
        .then(() => {
          done();
        });
  });

  describe('GET /books', () => {
    const booksList = Joi.array().items(Joi.object().keys({
      id: Joi.number(),
      name: Joi.string(),
      created_at: Joi.date().iso(),
      updated_at: Joi.date().iso(),
    }));

    it('Should return a list of books', (done) => {
      request
            .get('/books')
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
      created_at: Joi.date().iso(),
      updated_at: Joi.date().iso(),
    });

    it('Should return a books', (done) => {
      request
            .get('/books/1')
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
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .post('/books')
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
      };

      const updatedCount = Joi.array().items(1);

      request
        .put('/books/1')
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
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(204);
          done(err);
        });
    });
  });
});
