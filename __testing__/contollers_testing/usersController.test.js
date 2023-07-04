const request = require('supertest');
const app = require('../../app');
const { showById } = require('../../controllers/usersController');

describe('api server', () => {
	let api;
	beforeAll(() => {
		api = app.listen(3000, () => {
			console.log('Test server running on port 3000');
		});
	});

	afterAll((done) => {
		console.log('Stopping test server');
		api.close(done);
	});

	test('testing this', async () => {
		await request(app).get('/users').expect(200);
	});
	test('testing this', async () => {
		await request(app).get('/users/admin').expect(200);
	});
	test('testing this', async () => {
		await request(app).get('/users/1').expect(200);
	});
	test('testing this', async () => {
		await request(app).get('/users/name/asd').expect(200);
	});

	//POST tests

	test('reponds to creating new user with status of x', async () => {
		const testData = {
			username: 'dummyUsername',
			password: 'dummyPassword',
		};
		await request(api)
			.post('/users')
			.send(testData)
			.set('Accept', 'application/json')
			.expect(201)
			.expect({ ...testData, id: 4, admin: 'false' });
	});

	test('reponds to verify login with status of x', async () => {
		const testData = {
			username: 'dummyUsername',
			password: 'dummyPassword',
		};
		await request(api)
			.post('/users/login')
			.send(testData)
			.set('Accept', 'application/json')
			.expect(200)
			.expect({ ...testData, id: 4, admin: 'false' });
	});

	//wrong POST tests
	test('responds to wrong POST / serivce', async () => {
		await request(api).post('/users').expect(400);
	});

	//PATCH tests
	test('reponds to updating user with status of 200', async () => {
		const testData = {
			username: 'dummyUsername',
			password: 'dummyPassword',
		};
		await request(api).patch('/users/12').send(testData).expect(200);
	});

	//DELETE tests
	test('responds to deleting a user', async () => {
		await request(api).delete('/users/admin').expect(204);
	});
});
