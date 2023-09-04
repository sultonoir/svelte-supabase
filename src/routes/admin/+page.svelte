<!-- // src/routes/auth/+page.svelte -->
<script>
	import { goto } from '$app/navigation';
	import TipTap from '$lib/TipTap.svelte';
	import { redirect } from '@sveltejs/kit';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email = '';
	let password = '';
	let loading = false;

	const handleSignUp = async () => {
		try {
			loading = true;
			await supabase.auth.signUp({
				email,
				password
			});
			redirect(303, '/account');
		} catch (error) {
			// Tangani kesalahan di sini, misalnya dengan menampilkan pesan kesalahan kepada pengguna
			console.error('Terjadi kesalahan saat mendaftar:', error);
		} finally {
			loading = false;
		}
	};

	const handleSignIn = async () => {
		loading = true; // Anda harus mengubah loading menjadi true di sini

		try {
			const { data } = await supabase.auth.signInWithPassword({ email, password });

			if (data) {
				goto('/account'); // Arahkan ke halaman akun
			}
		} catch (error) {
			console.error('Terjadi kesalahan saat masuk:', error);
		} finally {
			loading = false;
		}
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<form on:submit={handleSignUp} class="flex flex-col p-5 gap-5">
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

	<button disabled={loading} class="btn-primary btn-default text-white">Sign up</button>
</form>
<TipTap />

<h1>memek</h1>
<button on:click={handleSignIn}>Sign in</button>
<button on:click={handleSignOut}>Sign out</button>

<style>
	::-ms-reveal {
		border: 1px solid white;
		border-radius: 50%;
		box-shadow: 0 0 3px currentColor;
		color: currentColor;
	}
</style>
