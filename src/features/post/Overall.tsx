import React from 'react';

import { TypeItemPost } from '@/api/interface/post';
import { Button } from '@/components/ui';

import { BlockContent } from './components';

interface Props {
  post: TypeItemPost;
}

const Overall = ({ post }: Props) => {
  const isRendering = post.status == 'rendering-img';

  const btnTitle = () => {
    if (isRendering) return 'Rendering';
    if (post.status == 'active') return 'Start render image';
    if (post.status == 'rendered-img') return 'Start render animation';
  };

  const onClickBtn = () => {
    if (post.status == 'active') {
      console.log('Start rendering');
    }
  };

  return (
    <>
      <div className="w-full inline-flex flex-col gap-y-8">
        {post.content.map((ct, id) => {
          return <BlockContent key={id} index={id + 1} content={ct} />;
        })}
      </div>

      <Button
        className="w-[90%] self-center mt-16 mb-[100px]"
        loading={isRendering}
        onClick={e => {
          e.preventDefault();
          onClickBtn();
        }}
      >
        {btnTitle()}
      </Button>
    </>
  );
};

export default Overall;
