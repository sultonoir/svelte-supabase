<script>
	const skillsData = [
		'HTML',
		'CSS',
		'JavaScript',
		'TypeScript',
		'React',
		'Next.js',
		'Node.js',
		'Git',
		'Tailwind',
		'Prisma',
		'MongoDB',
		'Express',
		'PostgreSQL',
		'SQL',
		'Figma',
		'SvelteKit',
		'Framer Motion'
	];

	import { fade } from 'svelte/transition';
</script>

<section id="skills" class="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40">
	<h2 class="text-3xl font-medium capitalize mb-8 text-center">Skill</h2>
	<ul class="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
		{#each skillsData as skill}
			<li class="bg-secondary borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80">
				{skill}
			</li>
		{/each}
	</ul>
</section>
