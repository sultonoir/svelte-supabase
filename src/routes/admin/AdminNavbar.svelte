<script lang="ts">
	import { onMount } from 'svelte';
	import { BellActiveAltSolid, BellSolid } from 'flowbite-svelte-icons';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	export let avatarUrl: string;
	export let bellNotifi: boolean;
	let loading: boolean;
	let show: boolean;
	let showGuest: boolean;
	const handelshow = () => {
		show = !show;
	};
	onMount(() => {
		document.body.addEventListener('click', (event) => {
			const button = document.getElementById('pr');
			if (button && !button.contains(event.target as Node)) {
				show = false;
			}
		});
	});
	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
			showGuest = !showGuest;
		};
	};

	export let handleSignOut: () => Promise<void>;
	export let guests:
		| {
				adminId: string | null;
				email: string | null;
				id: string;
				message: string | null;
				subject: string | null;
		  }[]
		| null;
</script>

<header class="flex justify-between w-full p-5 border-b border-border">
	<div class="mx-auto container flex justify-between w-full relative">
		<h2 class="font-semibold text-2xl">Admin</h2>
		<div class="flex flex-row gap-x-4">
			<form method="post" action="?/getGuest" use:enhance={handleSubmit}>
				<button
					class="h-10 w-10 justify-center flex items-center rounded-full relative border border-border"
				>
					{#if bellNotifi}
						<BellActiveAltSolid class="p-10" size="xl" ariaLabel="bellNotifi" />
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-bell"
							><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path
								d="M10.3 21a1.94 1.94 0 0 0 3.4 0"
							/></svg
						>
					{/if}
				</button>
			</form>

			<button id="pr" on:click={handelshow}>
				<img
					src={avatarUrl}
					alt={avatarUrl ? 'Avatar' : 'No image'}
					class="rounded-full border border-border object-cover w-[40px] h-[40px] cursor-pointer"
				/>
			</button>
		</div>

		{#if show}
			<div
				class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-11 right-0 bg-secondary"
			>
				<ul
					class="py-2 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownDefaultButton"
				>
					<li>
						<a
							href="/account"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>account</a
						>
					</li>
					<li>
						<button
							on:click={handleSignOut}
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-start"
						>
							Logout
						</button>
					</li>
				</ul>
			</div>
		{/if}
		{#if showGuest}
			<div
				class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-11 right-0 bg-secondary h-52 overflow-y-scroll"
			>
				{#if guests}
					{#each guests as guest}
						<ul
							class="py-2 text-sm text-gray-700 dark:text-gray-200"
							aria-labelledby="dropdownDefaultButton"
						>
							<li>
								<h2
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									{guest.email}
								</h2>
								<p
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									{guest.message}
								</p>
							</li>
						</ul>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</header>
