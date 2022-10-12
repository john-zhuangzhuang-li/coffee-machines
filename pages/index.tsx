import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { ref as refDB, onValue } from "firebase/database";
import { database } from "../util/firebase";

import Layout from "../components/Layout";
import Main from "../components/Main";
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";
import { UserProvider } from "../util/UserContext";
import { imgDataModel } from "../util/types";

const Home: NextPage = () => {
  // WORK ON THIS AND USE A SIMPLE METHOD TO LOAD ALL DATA AT ONCE

  const [imgList, setImgList] = useState<imgDataModel[] | null>(null);

  useEffect(() => {
    const imageListRef = refDB(database, `test-2/`);
    const unsubscribe = onValue(imageListRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      // console.log(data);
      const imgData: imgDataModel[] = Object.values(data);
      // console.log(imgData);
      imgData.sort((a, b) => b.timeStamp - a.timeStamp);
      // console.log(imgData);
      setImgList(imgData);

      return () => unsubscribe();
    });
  }, []);

  return (
    <UserProvider>
      <Layout imgList={imgList}>
        <Header />
        <Main imgList={imgList} />
        <LoadMore />
      </Layout>
    </UserProvider>
  );
};

export default Home;
