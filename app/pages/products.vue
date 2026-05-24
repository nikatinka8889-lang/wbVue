<template>
  <section class="long-goods d-block">
    <div class="container">
      <div class="row align-items-center mb-4">
        <div class="col-12">
          <h2 class="section-title">Category</h2>
        </div>
        <!-- /.col-12 -->
      </div>
      <div class="row long-goods-list">
      <div class="col-lg-3 col-sm-6" v-for="card in products" :key="card.id">
        <div class="goods-card">
          <span class="label" v-if="card.label">{{ titleFormat(card.label) }}</span>
          <!-- /.label --><img
            :src="card.img"
            :alt="card.name"
            class="goods-image"

          />
          <h3 class="goods-title">{{ card.name }}</h3>
          <!-- /.goods-title -->
          <p class="goods-description">{{ card.description }}</p>
          <!-- /.goods-description -->
          <button class="button goods-card-btn add-to-cart" @click="addToCard(card)">
            <span class="button-price">{{ card.price }}$</span>
          </button>
          <!-- /.goods-price -->
        </div>
        <!-- /.goods-card -->
      </div>
      </div>
    </div>
  </section>
</template>
  <script setup lang="ts">
  import type { CartItem } from "~/modules/cart.item.module";
import type { Product } from "~/modules/products.module";

      const cartItems = useCart();
    definePageMeta({
      layout: "custom",
    });

    const route = useRoute()
    const field = computed(()=> route.query.field || '')
        const name = computed(()=> route.query.name || '')

    const  {data: products} = await useAsyncData('filtered-products', ()=>{
      return $fetch(`/api/filtered-products?field=${field.value}&name=${name.value}`)
    }, {watch: [field, name ]})

const addToCard = (product: Product) => {
  const findItem = cartItems.value.find((c) => c.id === product.id);
  if (findItem) {
    findItem.count++;
  } else {
    const newCartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      count: 1,
    };
    cartItems.value.push(newCartItem);
  }

};
  </script>




