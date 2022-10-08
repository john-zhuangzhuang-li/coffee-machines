import type { NextPage } from "next";

import Layout from "../components/Layout";
import Main from "../components/Main";
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";
import { UserProvider } from "../util/UserContext";

const Home: NextPage = () => {
  return (
    <UserProvider>
      <Layout>
        <Header />
        <Main />
        <LoadMore />
      </Layout>
    </UserProvider>
  );
};

export default Home;
