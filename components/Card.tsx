import { Grid, GridItem, Heading, Icon, Box } from "@chakra-ui/react";
import { RiUnsplashFill } from "react-icons/ri";
import NextImage from "next/image";

type Props = {
  imageSrc: string;
};

const Card = ({ imageSrc }: Props) => {
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
        alignItems="center"
        p={3}
      >
        <Heading as="h5" size="xs">
          Box here
        </Heading>
        <Icon as={RiUnsplashFill} w={5} h={5} />
      </GridItem>
    </Grid>
  );
};

export default Card;
