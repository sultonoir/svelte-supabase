<script lang="ts">
	import avatar from '$lib/assets/1.png';
	import {
		GithubSolid,
		ArrowRightSolid,
		DownloadSolid,
		LinkedinSolid
	} from 'flowbite-svelte-icons';

	import { fade } from 'svelte/transition';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import TimeLIne from '../components/TimeLIne.svelte';
	import About from '../components/About.svelte';
	import Skills from '../components/Skills.svelte';

	let email = '';
	let message = '';
	let subject = '';
	let isLoading = false;

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async () => {
			isLoading = false;
		};
	};
</script>

<main class="flex flex-col items-center px-4">
	<section
		title="Home"
		id="home"
		class="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
	>
		<div in:fade out:fade class="flex items-center justify-center relative">
			<img
				in:fade={{ duration: 3000 }}
				src={avatar}
				alt="avatar"
				class="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
			/>
		</div>
		<h1 class="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl">
			<span class="font-bold">Hello, I'm Sulton.</span> I'm a{' '}
			<span class="font-bold">full-stack developer</span> with I enjoy building
			<span class="italic">sites & apps</span>. My focus is{' '}
			<span class="underline">React (Next.js)</span>.
		</h1>
		<div
			class="flex flex-col sm:flex-row items-center justify-center gapx-4 pt-2 pb-4 px-4 text-lg font-medium"
		>
			<a
				href="#contact"
				class="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
			>
				Contact me here{' '}
				<ArrowRightSolid />
			</a>
			<a
				class="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
				href="/CV.pdf"
				download
			>
				Download CV{' '}
				<DownloadSolid class="opacity-60 group-hover:translate-y-1 transition" />
			</a>
			<a
				class="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
				href="https://linkedin.com"
				target="_blank"
			>
				<LinkedinSolid />
			</a>

			<a
				class="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
				href="https://github.com"
				target="_blank"
			>
				<GithubSolid />
			</a>
		</div>
	</section>
	<div class="bg-gray-200 my-24 h-16 w-1 rounded-full hidden sm:block dark:bg-opacity-20" />
	<About />
	<Skills />
	<TimeLIne />
	<section id="contact" class="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center">
		<p class="text-gray-700 -mt-6 dark:text-white/80">
			Please contact me directly at{' '}
			<a class="underline" href="mailto:sultonalidrus4@gmail.com">
				sultonalidrus4@gmail.com
			</a>{' '}
			or through this form.
		</p>
		<form
			method="post"
			action="?/create"
			use:enhance={handleSubmit}
			class="mt-10 flex flex-col gap-y-2"
		>
			<input
				type="email"
				placeholder="example@gmail.com"
				name="email"
				id="email"
				class="input"
				value={email}
			/>
			<input
				type="text"
				placeholder="Subject"
				name="subject"
				id="subject"
				class="input"
				value={subject}
			/>
			<textarea
				class="flex h-52 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				name="message"
				id="message"
				placeholder="Your message"
				maxlength={5000}
				value={message}
			/>
			<button class="btn-primary btn-default text-white"> Submit </button>
		</form>
	</section>
</main>
