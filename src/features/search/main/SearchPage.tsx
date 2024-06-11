import { getResource } from '@/api';

import { Background, Body } from './components';

export default async function SearchPage({ params }: PageProps) {
  const response = await getResource();

  return (
    <>
      <Background />
      <Body suggestSearch={'data' in response ? response.data.top_searches : []} />
    </>
  );
}
