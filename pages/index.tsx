import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { useState, useEffect } from "react";
import { ref as refDB, onValue, get } from "firebase/database";
import { database } from "../util/firebase";

import Layout from "../components/Layout";
import Main from "../components/Main";
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";
import { UserProvider } from "../util/UserContext";
import { imgDataModel } from "../util/types";
import useLoadSize from "../util/useLoadSize";

const Home: NextPage = ({
  initialList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [imgList, setImgList] = useState<imgDataModel[] | null>(null);
  const { currentLoad, handleLoadMore } = useLoadSize();

  useEffect(() => {
    const imageListRef = refDB(database, "test-2/");
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
      <Layout>
        <Header />
        <Main
          imgList={imgList || initialList}
          currentLoad={currentLoad}
          isLoadingStatic={!imgList}
        />
        <LoadMore
          currentLoad={currentLoad}
          listSize={imgList ? imgList.length : 0}
          onLoadMore={handleLoadMore}
        />
      </Layout>
    </UserProvider>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const initialListRef = refDB(database, "test-2/");
  const snapshot = await get(initialListRef);
  if (!snapshot.exists())
    return {
      props: { initialList: null },
    };
  const data = snapshot.val();
  const imgData: imgDataModel[] = Object.values(data);
  imgData
    .sort((a, b) => b.timeStamp - a.timeStamp)
    .filter((img) => img.userEmail !== "cup@bottomless.com");

  return {
    props: { initialList: imgData },
  };
};
