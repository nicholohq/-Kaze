<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth.svelte.js';
	import Loader from '$lib/components/Loader.svelte';

	let { children } = $props();

	let loaderDone = $state(false);

	onMount(() => {
		auth.check().finally(() => {
			setTimeout(() => { loaderDone = true; }, 600);
		});

		let ticking = false;
		function onScroll() {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const bar = document.getElementById('scroll-progress');
					if (bar) {
						const scrollTop = window.scrollY;
						const docHeight = document.documentElement.scrollHeight - window.innerHeight;
						bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
					}
					ticking = false;
				});
				ticking = true;
			}
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div id="scroll-progress" role="progressbar" aria-label="Scroll progress"></div>

{#if !loaderDone}
	<Loader />
{/if}

{@render children()}
