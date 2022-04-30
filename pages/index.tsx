import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import { ProductsQuery, ProductsQueryVariables } from "../lib/graphqlClientTypes";

const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      name
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, error } = useQuery<
    ProductsQuery,
    ProductsQueryVariables
  >(PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Boxtribute Pre-Order Prototype</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Boxtribute Pre-Order Prototype
        </h1>
        <div>
          {data?.products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
