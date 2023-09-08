<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { fail, type SubmitFunction } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';

	export let supabase: SupabaseClient;
	export let id: string;
	let profileForm: HTMLFormElement;
	let title: string;
	let description: string = '';
	let image: string | null = null;
	let tag: string = '';
	let tags: string[] = [];
	let uploading: boolean;
	let content: string = '';
	let files: FileList;
	let avatarUrl: string | null = null;

	const dispatch = createEventDispatcher();

	function tambahkanTag(e: any) {
		e.preventDefault();
		if (tag.trim() !== '') {
			const updateTags = [...tags, tag];
			tags = updateTags;
			tag = '';
		}
	}

	function hapusTag(index: number) {
		const updatedTodos = tags.filter((_, i) => i !== index);
		tags = updatedTodos;
	}

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			let { error } = await supabase.storage.from('avatars').upload(filePath, file);

			if (error) {
				throw error;
			}

			image = filePath;
			const { data, error: err } = await supabase.storage.from('avatars').download(image);

			if (err) {
				throw err;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
			setTimeout(() => {
				dispatch('upload');
			}, 100);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	const handleSubmit = async () => {
		try {
			const { error } = await supabase.from('Blog').insert({
				adminId: id,
				title,
				image: avatarUrl,
				content
			});
			if (error) {
				console.log(error);
			}

			return {
				message: 'ok'
			};
		} catch (error) {}
	};
</script>

<main class="container mx-auto mt-10">
	<form on:submit={handleSubmit} bind:this={profileForm} class="flex flex-col gap-5">
		<input bind:value={title} class="input" />
		{#if avatarUrl}
			<img alt="s" src={avatarUrl} class="h-20 w-20 rounded-full object-cover" />
		{/if}
		<div style="width: 10em;">
			<label class="text-white btn-primary btn-default" for="single">
				{uploading ? 'Uploading ...' : 'Upload'}
			</label>
			<input
				style="visibility: hidden"
				type="file"
				id="single"
				accept="image/*"
				bind:files
				on:change={uploadAvatar}
				disabled={uploading}
			/>
		</div>
		<textarea
			value={description}
			placeholder="text"
			class="flex h-52 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		/>

		<!-- <div class="w-full">
			<div class="flex items-center space-x-2">
				<input type="text" class="input" placeholder="Tambahkan tag" bind:value={tag} />

				<button class="px-3 py-2 text-white bg-blue-500 rounded-md" on:click={tambahkanTag}
					>Tambah</button
				>
			</div>

			<div class="mt-2 space-x-2">
				{#each tags as tag, index}
					<div
						class="inline-flex items-center bg-blue-200 text-blue-700 rounded-md px-2 py-1 space-x-1"
					>
						<span>{tag}</span>
						<button class="text-red-500" on:click={() => hapusTag(index)}>&times;</button>
					</div>
				{/each}
			</div>
		</div> -->
		<button on:click={handleSubmit} class="btn-primary btn-default">submit</button>
	</form>
</main>
