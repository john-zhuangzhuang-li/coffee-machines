import type { NextPage } from "next";
import { chakra } from "@chakra-ui/react";

import Layout from "../components/Layout";
import Main from "../components/Main";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
      <Main />
    </Layout>
  );
};

export default Home;
