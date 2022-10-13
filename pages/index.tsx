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
import { IMAGES_PER_LOAD } from "../util/util";

const Home: NextPage = () => {
  // WORK ON THIS AND USE A SIMPLE METHOD TO LOAD ALL DATA AT ONCE

  const [imgList, setImgList] = useState<imgDataModel[] | null>(null);
  const [loadStep, setLoadStep] = useState(1);

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

  const handleLoadMore = () => {
    setLoadStep((prev) => prev + 1);
  };

  return (
    <UserProvider>
      <Layout imgList={imgList}>
        <Header />
        <Main imgList={imgList} loadStep={loadStep} />
        <LoadMore
          step={loadStep}
          maxStep={imgList ? Math.floor(imgList.length / IMAGES_PER_LOAD) : 0}
          onLoadMore={handleLoadMore}
        />
      </Layout>
    </UserProvider>
  );
};

export default Home;
