import { fetchShopifyProducts } from './src/lib/shopify';

async function main() {
  try {
    const products = await fetchShopifyProducts();
    console.log("Success! Fetched", products.length, "products.");
    console.log(products[0]);
  } catch (e) {
    console.error("Error fetching:", e);
  }
}
main();
