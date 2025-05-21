'use client';
import React, { useEffect } from 'react';

import { DialogAuth } from '@/components/dialogs';
import { useAppContext } from '@/app/provider';
import { HeaderTitle } from '@/components';
import { Skeleton } from '@/components/ui';

import { useProjects } from './hooks';
import { ItemProject } from './components';

const Authenticated = () => {
  const [{ profile }] = useAppContext();
  const [{ data, loading }] = useProjects();

  useEffect(() => {
    if (!profile) {
      DialogAuth.open({ mode: 'sign-in', canClose: false });
    }
  }, [profile]);

  const renderData = () => {
    if (loading) {
      return <Skeleton className="w-[150px] h-[80px]" />;
    }

    if (!data || !data.length) return null;

    return (
      <div className="w-full inline-flex flex-row flex-wrap justify-between gap-y-10 mt-4">
        {data.map(item => (
          <ItemProject item={item} />
        ))}
      </div>
    );
  };

  return (
    <>
      <HeaderTitle title="Projects" canGoBack={false} />
      {renderData()}
    </>
  );
};

const ProjectsPage = () => {
  const [{ initLoading }] = useAppContext();
  if (initLoading) return null;
  return <Authenticated />;
};

export default ProjectsPage;
