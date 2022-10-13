import { useState } from "react";

import {
  Grid,
  GridItem,
  Icon,
  Box,
  Text,
  Link,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { RiUnsplashFill } from "react-icons/ri";
import { ExternalLinkIcon } from "@chakra-ui/icons";
// import NextImage from "next/image";

import { imgDataModel } from "../util/types";

// type Props = {
//   imageId: string;
//   imageSrc: string;
//   authorName: string;
//   authorLink: string;
//   companyLink: string;
//   onImgClick: (event: React.MouseEvent<HTMLDivElement>) => void;
// };

interface Props extends imgDataModel {
  onImgClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Card = ({
  id,
  url,
  artist,
  artistUrl,
  company,
  companyUrl,
  onImgClick,
}: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const handleImgLoaded = () => {
    setImgLoaded(true);
  };

  return (
    <Grid
      templateRows="1fr min-content"
      borderRadius="lg"
      h="20rem"
      overflow="hidden"
      bg="bgCard"
    >
      <GridItem
        gridColumn="1 / -1"
        gridRow="1 / 2"
        overflow="hidden"
        cursor="pointer"
        sx={{
          "&:hover > figure": {
            transform: "scale(1.1)",
          },
        }}
        onClick={onImgClick}
        data-img-id={id}
        // data-img-url={url}
        // data-artist-url={artistUrl}
        // data-time-stamp={timeStamp}
      >
        <Box
          as="figure"
          width="100%"
          height="100%"
          overflow="hidden"
          // position="relative"
          transition="transform 0.2s ease-out"
          // bg={`url(${url})`}
          // bgSize="cover"
        >
          <Skeleton isLoaded={imgLoaded}>
            <Image
              src={url}
              minH="18rem"
              objectFit="cover"
              onLoad={handleImgLoaded}
            />
          </Skeleton>
          {/* <NextImage src={url} layout="fill" objectFit="cover" /> */}
        </Box>
      </GridItem>
      <GridItem
        gridColumn="1 / -1"
        gridRow="2 / 3"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        p={3}
      >
        <Text fontSize="sm" noOfLines={1}>
          {`Photo by `}
          <Link href={artistUrl} isExternal>
            {artist}
          </Link>
        </Text>
        <Link href={companyUrl} isExternal>
          <Icon
            as={company === "Unsplash" ? RiUnsplashFill : ExternalLinkIcon}
            w={4}
            h={4}
          />
        </Link>
      </GridItem>
    </Grid>
  );
};

export default Card;
