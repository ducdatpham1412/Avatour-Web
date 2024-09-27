import React, { ElementRef, useRef } from 'react';

import { DialogLocations } from '@/components/dialogs';
import { Button, Image } from '@/components/ui';
import { BookUserIcon, TrashCanIcon } from '@/components';
import { navigateNewTab } from '@/lib';
import { PROFILE_ROUTES } from '@/configs/routes';

interface Props {
  buddies: TypeProfile[];
  onChangeBuddies: (value: TypeProfile[]) => void;
}

const Buddies = ({ buddies, onChangeBuddies }: Props) => {
  const locationsDialog = useRef<ElementRef<typeof DialogLocations>>(null);

  return (
    <>
      <div className="w-full inline-flex flex-col gap-y-[24px] mt-[24px]">
        {buddies.map(b => {
          return (
            <button
              className="self-start w-[80%] md:w-[40%] inline-flex gap-4 hover-slow rounded-[14px]"
              key={b.id}
              onClick={() => {
                navigateNewTab(PROFILE_ROUTES.profileId(b.id));
              }}
            >
              <Image src={b.avatar} className="w-[35%] aspect-[4/2.5] rounded-[14px] shrink-0" />
              <p className="text-[14px] font-medium text-start">{b.name}</p>
              <button
                onClick={() => onChangeBuddies(buddies.filter(bud => bud.id !== b.id))}
                className="hover-scale self-center"
              >
                <TrashCanIcon />
              </button>
            </button>
          );
        })}
        <Button
          className="self-start w-[80%] md:w-[30%]"
          variant="outline"
          onClick={() => {
            locationsDialog.current?.open({
              currentLocs: buddies,
              onSave: v => {
                onChangeBuddies([...v]);
              },
              accountType: 'buddy',
            });
          }}
        >
          <BookUserIcon size={15} />
          Thêm buddy
        </Button>
      </div>

      <DialogLocations ref={locationsDialog} />
    </>
  );
};

export default Buddies;
