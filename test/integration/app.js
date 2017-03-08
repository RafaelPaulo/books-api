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
		it('Should return a list of books', (done) => {
			request
                .get('/books')
                .end((err, res) => {
	expect(res.body[0].id).to.be.equal(defaultBook.id);
	expect(res.body[0].name).to.be.equal(defaultBook.name);

	done(err);
});
		});
	});

	describe('GET /books/{id}', () => {
		it('Should return a books', (done) => {
			request
                .get('/books/1')
                .end((err, res) => {
	expect(res.body.id).to.be.equal(defaultBook.id);
	expect(res.body.name).to.be.equal(defaultBook.name);

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
			request
                .post('/books')
                .send(bookPost)
                .end((err, res) => {
	expect(res.body.id).to.be.equal(bookPost.id);
	expect(res.body.name).to.be.equal(bookPost.name);

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
                .end((err, res) => {
	expect(res.statusCode).to.be.equal(204);

	done(err);
});
		});
	});
});
