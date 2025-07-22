<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { watchEffect } from 'vue';
const { id } = defineProps(['id']);

const loaded = ref(false);
const error = ref(null);
const product = ref(null);
const route = useRoute();

watchEffect(() => {
  //const productId = route.params.id;
  if (!id) {
    error.value = 'Product ID is required';
    //loaded.value = true;
    return;
  }
   
  fetch(`/api/products/${id}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Product not found');
      }
      return response.json();
    })
    .then(data => {
      product.value = data;
      loaded.value = true;
    })
    .catch(err => {
      error.value = err.message;
      loaded.value = true;
    });
});


</script>

<template>
    <div v-if="loaded">
        <h1>Product Detail</h1>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-else-if="product">
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <p>Price: ${{ product.price.toFixed(2) }}</p>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>

    </div>
    <div v-else>
        <p>Perlu ID valid</p>
    </div>

</template>

<style scoped>

</style>
