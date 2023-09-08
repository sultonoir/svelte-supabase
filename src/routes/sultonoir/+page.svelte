<script lang="ts">
	import { goto } from '$app/navigation';
	import Theme from '$lib/Theme.svelte';
	import Logo from '$lib/assets/favicon.png';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;
	let loading: boolean;
	let alert: boolean;
	let messageError: string;

	const handleSignIn = async () => {
		loading = true;

		try {
			const { error } = await supabase.auth.signInWithPassword({ email, password });
			if (error) {
				alert = true;
				messageError = error.message;
			}
			if (!error) {
				goto('/admin', { replaceState: true });
			}
		} catch (error) {
			console.error('Terjadi kesalahan saat masuk:', error);
		} finally {
			loading = false;
		}
	};
</script>

<div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem]">
	<div class="flex items-center justify-center">
		<img alt="Logo" src={Logo} width="100" height="100" />
	</div>
	<form on:submit={handleSignIn} class="flex flex-col p-5 gap-5">
		{#if alert}
			<p class="text-destructive">{messageError}</p>
		{/if}
		<input
			name="email"
			disabled={loading}
			type="email"
			bind:value={email}
			placeholder="Email"
			class="input"
		/>
		<input
			name="pasword"
			disabled={loading}
			type="password"
			bind:value={password}
			placeholder="Password"
			class="input"
		/>

		<button disabled={loading} class="btn-primary btn-default text-white">Sign in</button>
	</form>
</div>
<div class="fixed bottom-0 right-0">
	<Theme />
</div>
