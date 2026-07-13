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

<!-- 和紙 — washi paper wash behind the whole app -->
<div class="washi-bg" aria-hidden="true"></div>

<!-- Global SVG filter defs (torn-ink edge for 判子 hanko seals) -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
	<defs>
		<filter id="hanko-rough">
			<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
			<feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
		</filter>
	</defs>
</svg>

{#if !loaderDone}
	<Loader />
{:else}
	{@render children()}
{/if}
