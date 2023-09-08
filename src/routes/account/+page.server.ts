import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('Admin')
		.select(`name, email, image,hasNotifi`)
		.eq('id', session.user.id)
		.single();

	return { session, profile };
};

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;
		const avatarUrl = formData.get('avatarUrl') as string;

		const session = await getSession();

		const { error } = await supabase.from('Admin').update({
			id: session?.user.id,
			name: fullName,
			image: avatarUrl,
			hasNotifi: false,
			email: session?.user.email
		});

		if (error) {
			return fail(500, {
				error
			});
		}

		return {
			fullName,
			avatarUrl
		};
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
};
