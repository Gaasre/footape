<script>
	import '../app.postcss';
	import "@fontsource/quicksand";
</script>

<slot />

<style>
	@import "@flaticon/flaticon-uicons/css/bold/rounded.css";

	:global(*) {
		font-family: "Quicksand";
		@apply scroll-smooth;
	}
</style>