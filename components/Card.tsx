import { Grid, GridItem, Icon, Box, Text, Link } from "@chakra-ui/react";
import { RiUnsplashFill } from "react-icons/ri";
import NextImage from "next/image";

type Props = {
  imageId: string;
  imageSrc: string;
  authorName: string;
  authorLink: string;
  companyLink: string;
  onImgClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const Card = ({
  imageId,
  imageSrc,
  authorName,
  authorLink,
  companyLink,
  onImgClick,
}: Props) => {
  return (
    <Grid
      templateRows="1fr min-content"
      borderRadius="lg"
      h="20rem"
      overflow="hidden"
    >
      <GridItem
        gridColumn="1 / -1"
        gridRow="1 / 2"
        bg="tomato"
        overflow="hidden"
        sx={{
          "&:hover > figure": {
            transform: "scale(1.1)",
          },
        }}
        onClick={onImgClick}
        data-img-id={imageId}
      >
        <Box
          as="figure"
          width="100%"
          height="100%"
          overflow="hidden"
          position="relative"
          transition="transform 0.2s ease-out"
        >
          <NextImage src={imageSrc} layout="fill" objectFit="cover" />
        </Box>
      </GridItem>
      <GridItem
        gridColumn="1 / -1"
        gridRow="2 / 3"
        bg="gray.300"
        color="gray.900"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        p={3}
      >
        {/* <Heading as="h5" size="xs">
          Box here
        </Heading> */}
        <Text fontSize="sm" noOfLines={1}>
          {`Photo by `}
          <Link href={authorLink} isExternal>
            {authorName}
          </Link>
        </Text>
        <Link href={companyLink} isExternal>
          <Icon as={RiUnsplashFill} w={5} h={5} />
        </Link>
      </GridItem>
    </Grid>
  );
};

export default Card;
