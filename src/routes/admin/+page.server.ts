import { fail } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data: profile } = await supabase
		.from('Admin')
		.select(`*`)
		.eq('id', session?.user.id as string)
		.single();

	const { data: guest } = await supabase.from('Guest').select('*');

	return { session, profile, guest };
};

export const actions = {
	getGuest: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();

		const { data } = await supabase
			.from('Admin')
			.select('hasNotifi')
			.eq('id', session?.user.id as string)
			.single();

		if (data?.hasNotifi === false) {
			return null;
		}

		const { error: er } = await supabase
			.from('Admin')
			.update({ hasNotifi: false })
			.eq('id', session?.user.id as string)
			.single();

		if (er) {
			return fail(500, { message: 'salah admin', er });
		}

		return {
			message: 'ok'
		};
	},
	createBlog: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const image = formData.get('image') as string;
		const content = formData.get('content') as string;

		const session = await getSession();
		if (!session) {
			return null;
		}
		const { error } = await supabase.from('Blog').insert({
			adminId: session.user.id,
			title,
			image,
			content
		});
		if (error) {
			return fail(500, { message: 'salah admin', error });
		}

		return {
			message: 'ok'
		};
	}
};
