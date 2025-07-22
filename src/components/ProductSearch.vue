<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
const products = ref([]);
const error = ref(null);
const loaded = ref(false);
//const route = useRoute();
const router = useRouter();
const { product} = defineProps(['search']);

//const search = ref(route.query.search || '');
const search = ref(product || '');
//console.log('Search query:', search);

watchEffect(() => {
    router.replace({name:'ProductSearch', query: {search: search.value } });
    fetch('/api/products.json')
        .then(response => {
           //console.log(response);
            return response.json();
        })
        .then(products=> products.filter(product => 
            product.name.toLowerCase().includes(search.value.toLowerCase())
            
        ))
        .then(data => {
            
            products.value = data;
            //console.log(data);
            //loaded.value = true;
        })
        .catch(err => {
            error.value = err.message;
            //loaded.value = true;
        });
});


</script>

<template>
    <h1>Product</h1>
    <p>Search for products here!</p>
    <input type="text" v-model="search" placeholder="Search products..." />
    <button>Search</button>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>
