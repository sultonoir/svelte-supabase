<!-- // src/routes/auth/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import Theme from '$lib/Theme.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import AdminNavbar from './AdminNavbar.svelte';
	import AdminPost from './AdminPost.svelte';

	export let data;
	let { supabase, profile, session, guest } = data;
	$: ({ supabase, profile, session, guest } = data);
	let url: string = profile?.image as string;
	let bellNotifi: boolean = profile?.hasNotifi as boolean;
	let avatarUrl: string;
	let blog: boolean;
	let project: boolean;

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	if (url) downloadImage(url);

	//! handle

	const handleBlog = () => {
		blog = !blog;
		project = false;
	};
	const handleSignOut = async () => {
		await supabase.auth.signOut();
		return goto('/sultonoir');
	};

	const handleProject = () => {
		project = !project;
		blog = false;
	};
</script>

{#if profile}
	<main>
		<AdminNavbar {handleSignOut} {avatarUrl} bind:bellNotifi guests={guest} />
		<div class="container mx-auto mt-2">
			<div
				class="flex flex-row justify-evenly bg-gray-100 dark:bg-[#232425] dark:border-black/40 dark:bg-opacity-75 p-3 rounded-md"
			>
				<button
					on:click={handleBlog}
					class={`${blog && 'bg-primary text-white'} px-4 py-2 rounded-md font-semibold`}
					>Create blog</button
				>
				<button
					on:click={handleProject}
					class={`${project && 'bg-primary text-white'} px-4 py-2 rounded-md font-semibold`}
					>Create Project</button
				>
			</div>
			{#if blog}
				<AdminPost {supabase} id={profile.id} />
			{/if}
		</div>
		<div class="fixed bottom-0 right-0">
			<Theme />
		</div>
	</main>
{/if}
