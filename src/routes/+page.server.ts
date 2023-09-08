// src/routes/login/+page.server.ts
import { fail } from '@sveltejs/kit';

export const actions = {
	create: async ({ request, locals: { supabase } }) => {
		const { data: admin, error } = await supabase
			.from('Admin')
			.select('id')
			.eq('email', 'sulton@gmail.com')
			.single();
		if (error) {
			return fail(500, { message: 'salah', error });
		}

		const { error: er } = await supabase
			.from('Admin')
			.update({ hasNotifi: true })
			.eq('email', 'sulton@gmail.com')
			.select();

		if (er) {
			return fail(500, { message: 'salah admin', er });
		}

		const formData = await request.formData();
		const email = formData.get('email') as string;
		const subject = formData.get('subject') as string;
		const message = formData.get('message') as string;
		const adminId = admin.id;

		const { error: err } = await supabase
			.from('Guest')
			.insert({ email: email, subject: subject, message: message, adminId: adminId })
			.select();

		if (err) {
			return fail(500, { message: 'salah', err });
		}
		return {
			message: 'Please check your email for a magic link to log into the website.',
			success: true
		};
	}
};
