import React from 'react';
import { CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui';
import { copyText } from '@/lib';

import { Block } from './components';

interface Props {
  voice: string;
  isRendering?: boolean;
  onRenderAudio?: () => void;
}

const VoiceOver = ({ voice, isRendering, onRenderAudio }: Props) => {
  return (
    <>
      <Block
        title="Voice over"
        RightHeader={
          <button
            onClick={e => {
              e.preventDefault();
              copyText(voice);
            }}
            className="hover-scale"
          >
            <CopyIcon strokeWidth={1.5} size={15} />
          </button>
        }
      >
        <p className="w-full px-4 py-4 text-[12px] whitespace-pre-line">{voice}</p>
      </Block>

      <Button
        className="w-[90%] self-center mt-16 mb-[100px]"
        loading={isRendering}
        onClick={e => {
          e.preventDefault();
          onRenderAudio?.();
        }}
      >
        {isRendering ? 'Rendering' : 'Start render audio'}
      </Button>
    </>
  );
};

export default VoiceOver;
