import type { NextPage } from "next";

import Layout from "../components/Layout";
import Main from "../components/Main";
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
      <Main />
      <LoadMore />
    </Layout>
  );
};

export default Home;
