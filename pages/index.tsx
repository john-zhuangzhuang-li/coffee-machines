import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { ref as refDB, onValue } from "firebase/database";
import { database } from "../util/firebase";

import Layout from "../components/Layout";
import Main from "../components/Main";
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";
import { UserProvider } from "../util/UserContext";

const Home: NextPage = () => {
  // WORK ON THIS AND USE A SIMPLE METHOD TO LOAD ALL DATA AT ONCE

  // useEffect(() => {
  //   const imageListRef = refDB(database, `path`);
  //   const unsubscribe = onValue(imageListRef, (snapshot) => {
  //     const data = snapshot.val();

  //     return () => unsubscribe();
  //   });
  // }, []);

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
