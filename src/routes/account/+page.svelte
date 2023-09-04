<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Avatar from './Avatar.svelte';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.name;
	let avatarUrl: string = profile?.image;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="flex flex-col gap-5 p-5">
	<form
		class="flex flex-col gap-5"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<Avatar
			{supabase}
			bind:url={avatarUrl}
			size={10}
			on:upload={() => {
				profileForm.requestSubmit();
			}}
		/>
		<div class="flex flex-col gap-1">
			<label for="email">Email</label>
			<input id="email" type="text" value={session?.user.email} disabled class="input" />
		</div>

		<div class="flex flex-col gap-1">
			<label for="fullName">Name</label>
			<input
				id="fullName"
				name="fullName"
				type="text"
				value={form?.fullName ?? fullName}
				class="input"
			/>
		</div>

		<div class="flex flex-col gap-1">
			<input
				type="submit"
				class="btn-primary btn-default text-white"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="btn-secondary btn-default w-full" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>
