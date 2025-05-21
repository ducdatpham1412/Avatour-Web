'use client';
import { AudioLinesIcon, ImagesIcon, LayoutList } from 'lucide-react';
import { PropsWithChildren, ReactElement, useState } from 'react';

import Metadata from '@/app/metadata';
import { HeaderTitle } from '@/components';
import TourLoadingIcon from '@/components/icon/TourLoadingIcon';
import { Textarea } from '@/components/ui';

import { usePost } from './hooks';
import Overall from './Overall';
import VoiceOver from './VoiceOver';

type Props = PageProps<{ post_id: string }>;
type BlockContentProps = PropsWithChildren & { title: string; RightHeader?: ReactElement };

const BlockContent = ({ children, title, RightHeader }: BlockContentProps) => {
  return (
    <div className="w-full inline-flex flex-col">
      <div className="w-full inline-flex flex-row justify-between items-center">
        <h1 className="font-medium text-[14px] md:text-[20px] mb-2">{title}</h1>
        {RightHeader}
      </div>
      {children}
    </div>
  );
};

const PostDetail = ({ params }: Props) => {
  const [{ data, loading }] = usePost(params.post_id);
  const [mode, setMode] = useState<'overall' | 'image' | 'voice'>('overall');

  const renderData = () => {
    if (loading) {
      return <TourLoadingIcon />;
    }

    if (!data) return null;

    const RightHeader = (
      <div className="inline-flex flex-row gap-x-6">
        <button
          className="hover-scale"
          onClick={e => {
            e.preventDefault();
            setMode('overall');
          }}
        >
          <LayoutList size={20} />
        </button>
        <button
          className="hover-scale"
          onClick={e => {
            e.preventDefault();
            setMode('image');
          }}
        >
          <ImagesIcon size={20} />
        </button>
        <button
          className="hover-scale"
          onClick={e => {
            e.preventDefault();
            setMode('voice');
          }}
        >
          <AudioLinesIcon size={20} />
        </button>
      </div>
    );

    const renderContent = () => {
      if (mode === 'overall') {
        return <Overall post={data} />;
      }
      if (mode === 'voice') {
        return (
          <VoiceOver
            voice={data.content.reduce((pre, cur, index) => {
              pre += `${cur.voice}`;
              if (index < data.content.length - 1) {
                pre += '\n\n';
              }
              return pre;
            }, '')}
          />
        );
      }
    };

    return (
      <div className="w-full inline-flex flex-col gap-y-12 mt-8">
        <BlockContent title="Idea">
          <p>{data.idea}</p>
        </BlockContent>

        <BlockContent title="Duration">
          <p>{data.total_duration} seconds</p>
        </BlockContent>

        <BlockContent title="Context">
          <Textarea defaultValue={data.context} />
        </BlockContent>

        <BlockContent title="Content" RightHeader={RightHeader}>
          {renderContent()}
        </BlockContent>
      </div>
    );
  };

  return (
    <>
      <Metadata title={data?.idea ?? ''} />
      <HeaderTitle title="Post" canGoBack />
      {renderData()}
    </>
  );
};

export default PostDetail;
