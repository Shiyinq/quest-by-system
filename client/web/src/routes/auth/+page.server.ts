import { userSignUp } from '$lib/apis/users';
import { fail } from '@sveltejs/kit';

const formValidation = (name: string, username: string, password: string) => {
	const validation = { name: '', username: '', password: '' };
	let valid = true;
	if (!name || typeof name !== 'string') {
		valid = false;
		validation['name'] = 'Name is required!';
	}

	if (!username || typeof username !== 'string') {
		valid = false;
		validation['username'] = 'Username is required!';
	}

	if (!password || typeof password !== 'string') {
		valid = false;
		validation['password'] = 'Password is required!';
	}

	return [valid, validation];
};

export const actions = {
	signUp: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string | null;
		const username = data.get('username') as string | null;
		const password = data.get('password') as string | null;

		const [valid, validation] = formValidation(name ?? '', username ?? '', password ?? '');
		if (!valid) {
			return fail(400, {
				status: false,
				errors: validation,
				message: 'Form not valid.'
			});
		}

		try {
			const result = await userSignUp(name ?? '', username ?? '', password ?? '');
			return { status: true, message: result.message };
		} catch (err) {
			console.log(err);
			return fail(500, {
				status: false,
				message: 'Sign up failed.'
			});
		}
	}
};
