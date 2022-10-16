import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { useState, useEffect } from "react";
import {
  ref as refDB,
  // onValue,
  get,
  // off,
  // getDatabase,
} from "firebase/database";
import { database } from "../util/firebase";

import Layout from "../components/Layout";
import Main from "../components/Main";
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";
import { UserProvider } from "../util/UserContext";
import { imgDataModel } from "../util/types";
import useLoadSize from "../util/useLoadSize";
import { TEST_USER_EMAIL, IMG_LIST_PATH, FETCH_URL_SAFE } from "../util/util";

const Home: NextPage = ({
  initialList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [imgList, setImgList] = useState<imgDataModel[] | null>(null);
  const { currentLoad, handleLoadMore } = useLoadSize();

  // FIND A WAY TO DEAL WITH THIS ERR
  // LIKELY BY WEBPACK + FIREBASE

  useEffect(() => {
    // TEMPORARILY USING REST API TO AVOID UNKNOWN FIREBASE DB SDK ERROR
    // NO USE OF LISTENER IN THIS SAFE MODE ONLY READING ONCE

    const safeFetch = async () => {
      const res = await fetch(`${FETCH_URL_SAFE}.json`);
      if (!res.ok) throw new Error("Data fetch with REST failed");
      const resData = await res.json();
      const imgData: imgDataModel[] = Object.values(resData);
      imgData.sort((a, b) => b.timeStamp - a.timeStamp);
      setImgList(imgData);
    };

    safeFetch().catch((error) => console.log(error));

    // TEST FOR UNKNOWN FIREBASE FUNC ERROR IN BUILD VER
    // const testData = {
    //   id: "test-2-img-015-540990748883",
    //   url: "https://firebasestorage.googleapis.com/v0/b/cup-bottomless.appspot.com/o/test-2%2Ftest-2-img-015.webp?alt=media&token=424407cd-e24b-405a-93bf-09fe1d7bf466",
    //   path: "test-2/test-2-img-015.webp",
    //   artist: "Hendrik Morkel",
    //   artistUrl:
    //     "https://unsplash.com/@hendrikmorkel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    //   company: "Unsplash",
    //   companyUrl:
    //     "https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    //   timeStamp: 1665776614775,
    //   userEmail: "co101zl@outlook.com",
    // };
    // const handleTest = setTimeout(() => {
    //   setImgList([testData]);
    // const databaseTest = getDatabase();
    // const imageListRef = refDB(databaseTest, IMG_LIST_PATH);
    // TRY WITH REST SOLUTION
    // const getDataTest = async () => {
    //   const snapshot = await get(imageListRef);
    //   console.log(snapshot);
    //   setImgList([testData]);
    // };
    // getDataTest();
    // get(imageListRef).then((snapshot) => console.log(snapshot));
    // }, 5000);
    // return () => clearTimeout(handleTest);
    //   const imageListRef = refDB(database, IMG_LIST_PATH);
    // Read once method
    // get(imageListRef)
    //   .then((snapshot) => {
    //     if (!snapshot.exists()) setImgList(null);
    //     const data = snapshot.val();
    //     const imgData: imgDataModel[] = Object.values(data);
    //     imgData.sort((a, b) => b.timeStamp - a.timeStamp);
    //     setImgList(imgData);
    //   })
    //   .catch((error) => console.log(error));
    // OFF METHOD
    // onValue(imageListRef, (snapshot) => {
    //   const data = snapshot.val();
    //   if (!data) return;
    //   const imgData: imgDataModel[] = Object.values(data);
    //   imgData.sort((a, b) => b.timeStamp - a.timeStamp);
    //   setImgList(imgData);
    // });
    // return () => off(imageListRef);
    // UNSUB METHOD
    // const unsubscribe = onValue(imageListRef, (snapshot) => {
    //   const data = snapshot.val();
    //   if (!data) return;
    //   const imgData: imgDataModel[] = Object.values(data);
    //   imgData.sort((a, b) => b.timeStamp - a.timeStamp);
    //   setImgList(imgData);
    // });
    // return () => unsubscribe();
  }, []);

  return (
    <UserProvider>
      <Layout>
        <Header />
        <Main
          imgList={imgList || initialList}
          currentLoad={currentLoad}
          // isLoadingStatic={true}
          isLoadingStatic={!imgList}
        />
        <LoadMore
          currentLoad={currentLoad}
          // listSize={imgList ? imgList.length : initialList.length}
          listSize={imgList ? imgList.length : 0}
          onLoadMore={handleLoadMore}
        />
      </Layout>
    </UserProvider>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // TEMPORARILY USING REST API TO AVOID UNKNOWN FIREBASE DB SDK ERROR
  // const res = await fetch(`${FETCH_URL_SAFE}.json`);
  // if (!res.ok) return { props: { initialList: null } };
  // const resData = await res.json();
  // const imgData: imgDataModel[] = Object.values(resData);
  // imgData
  //   .sort((a, b) => b.timeStamp - a.timeStamp)
  //   .filter((img) => img.userEmail !== TEST_USER_EMAIL);
  // return {
  //   props: { initialList: imgData },
  // };

  // FIREBASE DB SDK RUNS FINE IN SSG NOW
  // BUT ERROR STILL OCCUR WHEN IN BROWSER SOMEHOW
  const initialListRef = refDB(database, IMG_LIST_PATH);
  const snapshot = await get(initialListRef);
  if (!snapshot.exists())
    return {
      props: { initialList: null },
    };
  const data = snapshot.val();
  const imgData: imgDataModel[] = Object.values(data);
  imgData
    .sort((a, b) => b.timeStamp - a.timeStamp)
    .filter((img) => img.userEmail !== TEST_USER_EMAIL);

  return {
    props: { initialList: imgData },
  };
};
