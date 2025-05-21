import { FolderClosed } from 'lucide-react';
import Link from 'next/link';

import { PROJECT_ROUTES } from '@/configs/routes';
import { useProjects } from '@/features/project/hooks';

const ToolLeft = () => {
  const [{ data }] = useProjects();

  return (
    <div className="w-[300px] h-screen bg-gray_100 sticky top-0 shrink-0 px-6 py-6">
      <p className="font-semibold">Projects</p>
      <div className="w-full px-4 mt-4 inline-flex flex-col gap-y-4">
        {data?.map(project => {
          return (
            <Link
              className="inline-flex gap-x-2 items-center"
              href={PROJECT_ROUTES.projectDetail(project.id)}
            >
              <FolderClosed size={20} strokeWidth={1.5} className="shrink-0" />
              <p className="font-medium text-[12px]">{project.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ToolLeft;
