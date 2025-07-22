<script setup>



</script>

<template>
<div>
    <ul>
        <li><router-link :to="{ name: 'UserProfile'}">Profile</router-link></li>
        <li><router-link :to="{ name: 'UserWishlist' }">Wishlist</router-link></li>
        <li><router-link :to="{ name: 'UserOrder' }">Order</router-link></li>
    </ul>
</div>
</template>

<style scoped>
     .router-link-exact-active {
        text-decoration: none;
        color: rgb(187, 255, 0);
    }
</style>
