<script setup>

const {title} = defineProps({
  title: {
    type: String,
    
  }
})


</script>

<template>
<h1>{{ title }}</h1>
<p>Welcome to the home page!</p>
</template>

<style scoped>

</style>
