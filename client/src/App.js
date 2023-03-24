import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack,
  Image,
  SkeletonCircle,
  SkeletonText,
  Flex,
  Box
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import beautiful_website from "./beautiful_website.png";

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };

  return (
    <ChakraProvider>
      <Flex
        bgImage={`url(${beautiful_website})`}
        bgSize="cover"
        bgPosition="center"
        height="100vh"
        width="100vw"
        alignItems="top center"
        justifyContent="top center"
        // opacity={0.67}
        pt={"50"}
      >
        <Container maxW="60vw">
        <Heading fontSiz e="7xl" color="orange "> IMAGINATIVE 🎨</Heading>
          <Text marginBottom={"5px"} color="gray" >
          Experience the power of Stable Diffusion and transform your thoughts and ideas into breathtaking images. 
          </Text>
          <Wrap marginBottom={"10px"}>
          <Box marginTop="8" pt={"4"} >
          <Input
              value={prompt}
              onChange={(e) => updatePrompt(e.target.value)}
              width={"800px"}
              padding="30"
              fontSize="lg"
              color="white"
            ></Input>
            </Box>
            </Wrap>
            <Box marginTop="8"  >
            <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
              Start Creating Now
            </Button>
            </Box>
            
          
          <Box marginTop="8">
            {loading ? (
              <Stack>
                <SkeletonCircle />
                <SkeletonText />
              </Stack>
            ) : image ? (
              <Image src={`data:image/png;base64,${image}`} boxShadow="lg" border="1px solid #ddd" />
            ) : null}
          </Box>
          </Container>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
