import { fail } from '@sveltejs/kit';

import { userSignIn, userSignUp } from '$lib/apis/users';
// import { jwtDecode } from 'jwt-decode';

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

const signInFormValidation = (username: string, password: string) => {
	const validation = { username: '', password: '' };
	let valid = true;
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
	},
	signIn: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username') as string | null;
		const password = data.get('password') as string | null;

		const [valid, validation] = signInFormValidation(username ?? '', password ?? '');
		if (!valid) {
			return fail(400, {
				status: false,
				errors: validation,
				message: 'Form not valid.'
			});
		}

		try {
			const result = await userSignIn(username ?? '', password ?? '');
			// const { sub } = jwtDecode(result.access_token);
			// const maxAge = Math.floor(result.expire - Date.now() / 1000);

			// cookies.set('userId', sub ? sub : '', { path: '/' });
			// cookies.set('token', result.access_token, { path: '/', maxAge: maxAge });

			return { status: true, message: 'Sign successful.', ...result };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.log(err);
			return fail(500, {
				status: false,
				message: err?.detail ? err.detail : 'Sign in failed.'
			});
		}
	}
};
