<script>
	import { BriefcaseOutline, ReactSolid } from 'flowbite-svelte-icons';
</script>

<section id="experience" class="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40">
	<h2 class="text-3xl font-medium capitalize mb-8 text-center">Experience</h2>

	<ol class="border-l-2 border-info-100">
		<!--First item-->
		<li>
			<div class="flex-start md:flex">
				<div
					class="-ml-[20px] flex h-[35px] w-[35px] items-center justify-center rounded-full bg-info-100 text-info-700 z-10 bg-secondary"
				>
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
						class="lucide lucide-graduation-cap"
						><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg
					>
				</div>
				<div
					class="mb-10 ml-6 block max-w-md rounded-lg bg-neutral-50 p-6 shadow-md shadow-black/5 dark:bg-secondary dark:shadow-black/10"
				>
					<div class="mb-4 flex flex-col items-start">
						<a
							href="#!"
							class="text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700 text-lg font-semibold"
							>Graduated</a
						>
						<a
							href="#!"
							class="text-sm text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700 text-muted-foreground"
							>University Bina Sarana Informatika , Sukabumi - 2023</a
						>
					</div>
					<p class="mb-6 text-neutral-700 dark:text-neutral-200 text-justify">
						I graduated after 4 years of studying. I immediately found a job as a junior front-end
						developer.
					</p>
				</div>
			</div>
		</li>

		<!--Second item-->
		<li>
			<div class="flex-start md:flex">
				<div
					class="-ml-[20px] flex h-[35px] w-[35px] items-center justify-center rounded-full bg-info-100 text-info-700 z-10 bg-secondary"
				>
					<BriefcaseOutline />
				</div>
				<div
					class="mb-10 ml-6 block max-w-md rounded-lg bg-neutral-50 p-6 shadow-md shadow-black/5 dark:bg-secondary dark:shadow-black/10"
				>
					<div class="mb-4 flex flex-col items-start">
						<a
							href="#!"
							class="text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700 text-lg font-semibold"
							>Junior Front-End Developer</a
						>
						<a
							href="#!"
							class="text-sm text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700 text-muted-foreground"
							>Diskominfo City of Sukabumi 2022 - 2023
						</a>
					</div>
					<p class="mb-6 text-neutral-700 dark:text-neutral-200 text-justify">
						I worked as a front-end developer for 6 month.
					</p>
				</div>
			</div>
		</li>
		<!--Third item-->
		<li>
			<div class="flex-start md:flex">
				<div
					class="-ml-[20px] flex h-[35px] w-[35px] items-center justify-center rounded-full bg-info-100 text-info-700 z-10 bg-secondary"
				>
					<ReactSolid />
				</div>
				<div
					class="mb-10 ml-6 block max-w-md rounded-lg bg-neutral-50 p-6 shadow-md shadow-black/5 dark:bg-secondary dark:shadow-black/10"
				>
					<div class="mb-4 flex flex-col items-start">
						<a
							href="#!"
							class="text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700 text-lg font-semibold"
							>Front end Developer</a
						>
						<a
							href="#!"
							class="text-sm text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700 text-muted-foreground"
							>Sukabumi, Indonesia - Present</a
						>
					</div>
					<p class="mb-6 text-neutral-700 dark:text-neutral-200 text-justify">
						I'm now a front end developer working as a freelancer. My stack includes React, Next.js,
						TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.
					</p>
				</div>
			</div>
		</li>
	</ol>
</section>
