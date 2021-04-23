import { ChakraProvider } from '@chakra-ui/react';

const withChakra = (StoryFn: Function) => {
  return (
    <ChakraProvider>
      <div id="story-wrapper" style={{ minHeight: '100vh' }}>
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

export const decorators = [withChakra];
