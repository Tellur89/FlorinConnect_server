const User = require('../../models/User');
const { getOneById } = require('../../controllers/usersController');
describe('User Model', () => {
	test('is described', () => {
		expect(User).toBeDefined();
	});

	test('user all exist', () => {
		const user = User.getAll;
		expect(user).toBeDefined();
	});
	test('user.all exist', () => {
		const user = User.getAll();
		expect(user.value).toBe(0).expect('No users in database');
	});
});
