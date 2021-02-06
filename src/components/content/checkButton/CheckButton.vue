<template>
	<div class="check-button" :class="{check: isChecked}">
		<img src="~assets/img/cart/tick.svg" alt="">
	</div>
</template>

<script>
export default {
	name: 'CheckButton',
	props: {
		isChecked: {
			type: Boolean,
			default: false
		}
	},
	
}
</script>

<style>
.check-button {
	/* background-color: green; */
	border-radius: 50%;
	border: 2px solid #eee;
}

.check {
	background-color: green;
}
</style>