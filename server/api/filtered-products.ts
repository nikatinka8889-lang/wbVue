import { Product } from "../../app/modules/products.module";

export interface Query  {
  field: keyof Product,
  name: string | undefined,
}
const getFilteredProducts = (products:Product[], query:Query) => {
  if(query.field && query.name ) {
    return products.filter(
      c => {
        const key = c[query.field]
        if(typeof key === 'string'){
          return key.toLowerCase() ===  query.name?.toLowerCase()
        }else {
          return c[query.field] === query.name
        }
      }
    )
  }else {
    return products
  }
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
const {field, name}:Query = getQuery(event)
  const products: Product[] = await $fetch(
    "https://wb-nuxt-99e5d-default-rtdb.firebaseio.com/.json",);

  return getFilteredProducts(products, {field:field, name:name});
});
