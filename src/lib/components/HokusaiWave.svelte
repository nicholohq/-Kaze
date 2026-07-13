<script lang="ts">
	let { variant = 'hero', class: className = '' }: { variant?: 'hero' | 'banner', class?: string } = $props();
</script>

{#if variant === 'hero'}
	<svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" class={className}>
		<defs>
			<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#e8e0d0" />
				<stop offset="100%" stop-color="#d4cdc0" />
			</linearGradient>
			<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="var(--wave-mid)" />
				<stop offset="100%" stop-color="var(--wave-deep)" />
			</linearGradient>
			<linearGradient id="waveBody" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stop-color="#1e3042" />
				<stop offset="100%" stop-color="var(--wave-deep)" />
			</linearGradient>
		</defs>

		<rect width="1440" height="700" fill="url(#sky)" />

		{#snippet fuji()}
			<g transform="translate(640, 240)">
				<path d="M-80 0 L0 -120 L80 0 Z" fill="#3a5a7a" />
				<path d="M-35 -70 L0 -120 L35 -70 L25 -75 L0 -85 L-25 -75 Z" fill="#e8e0d0" opacity="0.9" />
				<path d="M-70 0 L-80 0 L-60 -20 Z" fill="#2a4a6a" opacity="0.5" />
				<path d="M70 0 L80 0 L60 -20 Z" fill="#2a4a6a" opacity="0.5" />
			</g>
		{/snippet}

		<rect x="0" y="240" width="1440" height="460" fill="url(#sea)" />

		{@render fuji()}

		{#snippet backgroundWave()}
			<path d="M-100 550 Q 200 450, 500 380 Q 800 310, 1100 280 Q 1400 250, 1600 260 L1600 700 L-100 700 Z" fill="var(--wave-deep)" opacity="0.15" />
			<path d="M-100 600 Q 300 520, 700 460 Q 1100 400, 1600 380 L1600 700 L-100 700 Z" fill="var(--wave-deep)" opacity="0.12" />
		{/snippet}

		{@render backgroundWave()}

		<path d="M-100 660 L-100 580 C 50 530, 200 450, 350 380 C 500 310, 650 230, 780 160 C 870 115, 920 85, 950 80 C 930 95, 890 120, 850 160 C 790 215, 710 255, 600 290 C 480 330, 320 380, 150 450 C 50 500, -50 560, -100 620 Z" fill="url(#waveBody)" />

		<path d="M 780 160 C 830 130, 880 110, 920 95 C 950 85, 960 80, 950 85 C 930 95, 910 105, 890 115 C 860 130, 830 145, 800 165 C 780 180, 760 190, 740 198 C 720 205, 700 210, 680 215 L 690 220 C 710 215, 730 210, 750 200 C 770 190, 790 175, 810 160 C 820 150, 840 140, 860 130 C 880 120, 890 115, 880 110 C 860 105, 830 105, 800 115 C 785 120, 775 130, 780 160 Z" fill="var(--paper)" />

		<path d="M 780 160 C 740 180, 700 200, 660 220 C 680 200, 710 185, 740 170 C 760 160, 775 155, 780 160 Z" fill="var(--paper)" />
		<path d="M 810 150 C 780 175, 750 195, 720 215 C 745 195, 770 180, 790 165 C 800 158, 808 152, 810 150 Z" fill="var(--paper)" />
		<path d="M 840 135 C 820 160, 800 185, 785 210 C 800 190, 815 170, 830 155 C 838 145, 842 140, 840 135 Z" fill="var(--paper)" />
		<path d="M 870 115 C 860 140, 850 165, 845 190 C 855 170, 862 150, 868 135 C 872 125, 874 120, 870 115 Z" fill="var(--paper)" />
		<path d="M 900 100 C 900 120, 895 140, 895 160 C 900 145, 905 130, 908 115 C 908 108, 905 103, 900 100 Z" fill="var(--paper)" />
		<path d="M 930 90 C 935 105, 940 120, 945 135 C 945 120, 945 110, 942 100 C 938 95, 935 92, 930 90 Z" fill="var(--paper)" />

		<circle cx="700" cy="200" r="3" fill="var(--paper)" opacity="0.6" />
		<circle cx="680" cy="215" r="2" fill="var(--paper)" opacity="0.5" />
		<circle cx="660" cy="230" r="2.5" fill="var(--paper)" opacity="0.4" />
		<circle cx="650" cy="245" r="1.5" fill="var(--paper)" opacity="0.3" />
		<circle cx="720" cy="175" r="2" fill="var(--paper)" opacity="0.7" />
		<circle cx="740" cy="165" r="1.5" fill="var(--paper)" opacity="0.8" />
		<circle cx="760" cy="155" r="2.5" fill="var(--paper)" opacity="0.6" />
		<circle cx="830" cy="140" r="2" fill="var(--paper)" opacity="0.5" />
		<circle cx="850" cy="125" r="1.5" fill="var(--paper)" opacity="0.7" />
		<circle cx="885" cy="105" r="2" fill="var(--paper)" opacity="0.6" />
		<circle cx="920" cy="90" r="3" fill="var(--paper)" opacity="0.5" />
		<circle cx="940" cy="80" r="2" fill="var(--paper)" opacity="0.4" />
		<circle cx="960" cy="85" r="2.5" fill="var(--paper)" opacity="0.5" />

		<path d="M-100 620 C 0 570, 150 520, 280 520 C 410 520, 500 540, 600 560 C 400 550, 300 540, 180 540 C 80 540, -20 570, -100 630 Z" fill="var(--wave-deep)" opacity="0.8" />

		<g transform="translate(280, 530)" fill="var(--charcoal)">
			<path d="M0 0 L24 0 L30 6 L-6 6 Z" />
			<line x1="12" y1="-18" x2="12" y2="0" stroke="var(--charcoal)" stroke-width="2" />
			<circle cx="12" cy="-21" r="5" fill="none" stroke="var(--paper)" stroke-width="1.2" opacity="0.7" />
		</g>

		<g transform="translate(520, 450)" fill="var(--charcoal)">
			<path d="M0 0 L18 0 L22 5 L-4 5 Z" />
			<line x1="9" y1="-14" x2="9" y2="0" stroke="var(--charcoal)" stroke-width="1.5" />
			<circle cx="9" cy="-17" r="4" fill="none" stroke="var(--paper)" stroke-width="1" opacity="0.7" />
		</g>

		<path d="M100 650 Q 200 600, 350 590 Q 500 580, 650 590 Q 800 600, 900 620 L900 700 L100 700 Z" fill="var(--wave-deep)" opacity="0.9" />

		<path d="M 350 590 Q 450 580, 550 585 Q 500 590, 450 595 Q 400 600, 350 590 Z" fill="var(--wave-mid)" opacity="0.3" />
		<path d="M 600 590 Q 700 595, 800 605 Q 750 600, 700 598 Q 650 595, 600 590 Z" fill="var(--wave-mid)" opacity="0.3" />

		<circle cx="585" cy="575" r="1.5" fill="var(--paper)" opacity="0.3" />
		<circle cx="620" cy="580" r="1" fill="var(--paper)" opacity="0.25" />
		<circle cx="650" cy="578" r="1.5" fill="var(--paper)" opacity="0.2" />
	</svg>
{:else if variant === 'banner'}
	<svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMid meet" class={className}>
		<defs>
			<linearGradient id="bannerSky" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#e8e0d0" />
				<stop offset="100%" stop-color="#d4cdc0" />
			</linearGradient>
			<linearGradient id="bannerSea" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="var(--wave-mid)" />
				<stop offset="100%" stop-color="var(--wave-deep)" />
			</linearGradient>
		</defs>

		<rect width="1440" height="240" fill="url(#bannerSky)" />

		<g transform="translate(640, 80)">
			<path d="M-40 0 L0 -60 L40 0 Z" fill="#3a5a7a" />
			<path d="M-18 -35 L0 -60 L18 -35 L12 -38 L0 -43 L-12 -38 Z" fill="#e8e0d0" opacity="0.9" />
		</g>

		<rect x="0" y="80" width="1440" height="160" fill="url(#bannerSea)" />

		<path d="M-100 240 L-100 180 C 50 150, 200 120, 350 100 C 500 80, 600 70, 700 65 C 800 60, 900 55, 1000 60 C 1100 65, 1200 80, 1300 100 C 1400 120, 1500 150, 1600 180 L1600 240 Z" fill="var(--wave-deep)" opacity="0.3" />

		<path d="M-100 240 L-100 200 C 100 170, 300 140, 500 120 C 700 100, 850 85, 950 80 C 1050 75, 1150 80, 1250 95 C 1350 110, 1450 140, 1600 180 L1600 240 Z" fill="var(--wave-deep)" opacity="0.2" />

		<path d="M-100 240 L-100 220 C 150 190, 400 165, 650 145 C 850 130, 1000 120, 1100 115 C 1200 110, 1350 120, 1600 170 L1600 240 Z" fill="url(#bannerSea)" opacity="0.8" />

		<path d="M 700 65 C 720 60, 750 58, 780 60 C 760 62, 740 65, 720 68 C 710 70, 705 68, 700 65 Z" fill="var(--paper)" opacity="0.6" />
		<path d="M 800 62 C 820 60, 850 60, 880 62 C 860 64, 840 65, 820 66 C 810 66, 805 64, 800 62 Z" fill="var(--paper)" opacity="0.5" />
		<path d="M 900 60 C 920 58, 950 58, 980 62 C 960 64, 940 65, 920 65 C 910 64, 905 62, 900 60 Z" fill="var(--paper)" opacity="0.4" />

		<circle cx="750" cy="60" r="1.5" fill="var(--paper)" opacity="0.5" />
		<circle cx="820" cy="58" r="1" fill="var(--paper)" opacity="0.4" />
		<circle cx="880" cy="58" r="1.5" fill="var(--paper)" opacity="0.35" />
		<circle cx="940" cy="56" r="1" fill="var(--paper)" opacity="0.3" />
	</svg>
{/if}

<style>
	svg { display: block; }
</style>
