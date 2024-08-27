import Container from '@/app/container';

import { Body } from './components';

const SearchPage = () => {
  return (
    <Container
      showHeader={false}
      metaData={{
        title: 'Avatour Gợi ý lịch trình',
      }}
    >
      <Body />
    </Container>
  );
};

export default SearchPage;
