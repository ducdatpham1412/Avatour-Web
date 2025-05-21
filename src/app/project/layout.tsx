import React from 'react';

import Container from '@/layouts/Container';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      metaData={{
        title: 'MCT Auto',
      }}
    >
      {children}
    </Container>
  );
};

export default layout;
