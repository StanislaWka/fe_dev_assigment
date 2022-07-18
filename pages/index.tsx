import Head from 'next/head';
import { ProductLayout } from '../layouts';

export function Product() {
  return (
    <div>
      <Head>
        <title>Clean Lean Protein</title>
        <meta name="description" content="Clean Lean Protein" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductLayout />
    </div>
  );
}

export default Product;
