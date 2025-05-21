import { CopyIcon } from 'lucide-react';
import { useState } from 'react';

import { TypeItemPost } from '@/api/interface/post';
import { Image, Textarea } from '@/components/ui';
import { copyText } from '@/lib';

import Block from './Block';

interface Props {
  index: number;
  content: TypeItemPost['content'][number];
}

interface ImageUrlProps {
  imageUrl: string;
  onRemake: () => void;
}

const ImageUrl = ({ imageUrl, onRemake }: ImageUrlProps) => {
  const [success, setSuccess] = useState(false);
  const [showRemake, setShowRemake] = useState(false);

  return (
    <div
      className="h-full aspect-[16/9] border-[1px] border-gray_300 rounded-md"
      role={success ? 'button' : undefined}
    >
      <Image
        src={imageUrl}
        className="w-full h-full rounded-md"
        onSuccess={() => setSuccess(true)}
      />
    </div>
  );
};

const BlockContent = ({ index, content }: Props) => {
  return (
    <div className="w-full bg-gray_100 rounded-md">
      <div className="w-full py-2 px-4 bg-gray_300 rounded-md font-medium">
        {index}. {content.title} ({content.duration}s)
      </div>
      <div className="w-full py-6 px-4 inline-flex flex-col gap-y-4">
        <Block
          title="Voice"
          RightHeader={
            <button
              onClick={e => {
                e.preventDefault();
                copyText(content.voice);
              }}
              className="hover-scale"
            >
              <CopyIcon strokeWidth={1.5} size={15} />
            </button>
          }
        >
          <p className="w-full py-2 px-4 text-[12px]">{content.voice}</p>
        </Block>

        <Block title="Illustrations">
          <div className="w-full inline-flex flex-col py-2 px-4 gap-y-4">
            {content.illustrations.map((il, id) => {
              return (
                <div key={id} className="w-full h-[150px] inline-flex flex-row gap-x-4">
                  <div className="flex-1 inline-flex flex-col gap-y-2">
                    <Textarea className="flex-1 border-gray_300" defaultValue={il.image} />
                    {/* {il.image_urls.length >= 2 && (
                      <div className="w-full shrink-0 inline-flex flex-row gap-x-2 overflow-auto beautiful-scrollbar">
                        {il.image_urls.map(url => {
                          return (
                            <Image
                                key={url}
                                src={url}
                                className="w-[100px] aspect-[16/9] rounded-md border-[1px] cursor-pointer hover-scale"
                            />
                          );
                        })}
                      </div>
                    )} */}
                  </div>
                  <ImageUrl imageUrl={il.image_selected} onRemake={() => null} />
                </div>
              );
            })}
          </div>
        </Block>
      </div>
    </div>
  );
};

export default BlockContent;
