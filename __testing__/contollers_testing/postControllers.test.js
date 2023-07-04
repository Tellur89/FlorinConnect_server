const request = require('supertest');
const app = require('../../app');

describe('api server', () => {
	// let api;
	beforeAll(() => {
		app.listen(3000, () => {
			console.log('Test server running on port 3000');
		});
	});

	// afterAll((done) => {
	// 	console.log('Stopping test server');
	// 	api.close(done);
	// });

	test('testing this', async () => {
		await request(app).get('/posts').expect(200);
	});
});
