<script setup>

import { RouterView } from 'vue-router';



</script>

<template>

    
        <RouterView  name="header"/>
        <RouterView v-slot="{Component}">
            <component :is="Component" :request-id="$route.query.requestId" />
        </RouterView>
        <RouterView name="footer" />

</template>

<style scoped>
   

</style>
