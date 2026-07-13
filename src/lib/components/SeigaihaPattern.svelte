<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<svg viewBox="0 0 60 60" class={className} preserveAspectRatio="none" aria-hidden="true">
	<defs>
		<g id="scale">
			<circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3" />
			<circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25" />
			<circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.2" />
			<circle cx="0" cy="0" r="5" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.15" />
		</g>
	</defs>
	<rect width="60" height="60" fill="none" />
	<use href="#scale" x="0" y="0" />
	<use href="#scale" x="30" y="0" />
	<use href="#scale" x="15" y="30" />
	<use href="#scale" x="45" y="30" />
	<use href="#scale" x="0" y="60" />
	<use href="#scale" x="30" y="60" />
</svg>
