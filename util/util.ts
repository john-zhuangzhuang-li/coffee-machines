import Resizer from "react-image-file-resizer";

export const IMG_LIST_PATH = "coffee/";
export const TEST_USER_EMAIL = "cup@bottomless.com";
export const FETCH_URL_SAFE =
  "https://cup-bottomless-default-rtdb.firebaseio.com/coffee";

export const resizeImage = (file: File): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      2500,
      "webp",
      90,
      0,
      (file) => {
        console.log("COMPRESSING FILE");
        // console.log(uri);
        if (file instanceof File) resolve(file);
      },
      "file"
    );
  });

export const handleUnsplashCreditSplit = (credit: string) => {
  const splitCredit = credit.split(` on `);
  if (splitCredit.length !== 2) return;
  const parsedCredit = splitCredit.map((credit) => {
    const indexFirstQuote = credit.indexOf(`"`);
    const indexLastQuote = credit.lastIndexOf(`"`);
    const url = credit.slice(indexFirstQuote + 1, indexLastQuote);
    const indexFirstRightAngleBracket = credit.indexOf(`>`);
    const indexLastLeftAngleBracket = credit.lastIndexOf(`<`);
    const text = credit.slice(
      indexFirstRightAngleBracket + 1,
      indexLastLeftAngleBracket
    );
    return { url, text };
  });
  const { text: artist, url: artistUrl } = parsedCredit[0];
  const { text: company, url: companyUrl } =
    parsedCredit[parsedCredit.length - 1];
  if (
    !artist ||
    !artistUrl ||
    !artistUrl.startsWith("https://unsplash.com/") ||
    !company ||
    company !== "Unsplash" ||
    !companyUrl ||
    !companyUrl.startsWith("https://unsplash.com/")
  )
    return;
  return {
    artist,
    artistUrl,
    company,
    companyUrl,
  };
};
