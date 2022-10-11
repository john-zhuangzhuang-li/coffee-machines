import Resizer from "react-image-file-resizer";

export const resizeImage = (file: File): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "webp",
      90,
      0,
      (uri) => {
        // NARROWING DOWN URI TO FILE OPTION
        console.log("COMPRESSING FILE");
        // console.log(uri);
        if (uri instanceof File) resolve(uri);
      },
      "file"
    );
  });

export const handleUnsplashCreditSplit = (credit: string) => {
  const splitCredit = credit.split(` on `);
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
  return {
    artist,
    artistUrl,
    company,
    companyUrl,
  };
};
