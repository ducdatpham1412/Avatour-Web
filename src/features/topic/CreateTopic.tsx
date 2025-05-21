'use client';

import { HeaderTitle, TourLoadingIcon } from '@/components';
import { Button, Input } from '@/components/ui';

import { useProject } from '../project/hooks';

type Props = PageProps<
  undefined,
  {
    p: string;
  }
>;

const CreateTopic = ({ searchParams }: Props) => {
  const [{ data, loading, loadingCreateTopic }, { createTopic }] = useProject(searchParams.p);

  const renderData = () => {
    if (loading) {
      return <TourLoadingIcon />;
    }

    if (!data) return null;

    const onCreate = async () => {};

    return (
      <div className="w-full mt-[150px] inline-flex flex-col items-center">
        <Input className="w-[400px]" placeholder="Enter topic name" />
        <Button className="w-[250px] mt-[40px]">Create</Button>
      </div>
    );
  };

  return (
    <>
      <HeaderTitle title="Create topic" canGoBack />
      {renderData()}
    </>
  );
};

export default CreateTopic;
