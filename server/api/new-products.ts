import {Product} from '../../app/modules/products.module'

const getNewProducts = (products:Product[]) => {
    return products.filter(c => String(c.label).toLowerCase() === 'new' ).splice(0, 4)
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const products:Product[] = await $fetch('https://wb-nuxt-99e5d-default-rtdb.firebaseio.com/.json')

  return getNewProducts(products)
})


