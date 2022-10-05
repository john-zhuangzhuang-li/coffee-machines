const DUMMY_NUM = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const DUMMY_SRC = ["/test-img-1.jpg", "/test-img-2.jpg", "/test-img-3.jpg"];

export const DUMMY_DATA = DUMMY_NUM.map((item, index) => {
  let src = "";
  const currentIndex = index + 1;
  if ([1, 4, 7, 10].includes(currentIndex)) src = DUMMY_SRC[0];
  if ([2, 5, 8, 11].includes(currentIndex)) src = DUMMY_SRC[1];
  if ([3, 6, 9, 12].includes(currentIndex)) src = DUMMY_SRC[2];
  return {
    id: item,
    src,
  };
});
