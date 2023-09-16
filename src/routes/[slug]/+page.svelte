<script lang="ts">
	import * as config from '$lib/config'
	import { formatDate } from '$lib/utils.js'
	export let data
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<!-- <meta name="keywords" content={data.meta.keywords} />
    <meta name="author" content={data.meta.author} />
    <meta name="robots" content={data.meta.robots} />
    <meta name="og:image" content={data.meta.image} />
    <meta name="og:url" content={data.meta.url} />
    <meta name="og:site_name" content={data.meta.site_name} />
    <meta name="og:locale" content={data.meta.locale} /> -->
	<meta name="og:title" content={data.meta.title} />
	<meta name="og:description" content={data.meta.description} />
	<meta name="og:type" content="article" />
</svelte:head>

<article>
	<hrgroup>
		<h1>{data.meta.title}</h1>
		<p class="date">{formatDate(data.meta.date)}</p>

		<div class="tags">
			{#each data.meta.categories as category}
				<span class="surface-4">&num;{category}</span>
			{/each}
		</div>

		<div class="prose">
			<svelte:component this={data.content} />
		</div>
	</hrgroup>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	h1 {
		text-transform: capitalize;
	}

	h1 + p {
		margin-top: var(--size-2);
		color: var(--text-2);
	}

	.tags {
		display: flex;
		gap: var(--size-3);
		margin-top: var(--size-7);
	}

	.tags > * {
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-round);
	}
</style>
