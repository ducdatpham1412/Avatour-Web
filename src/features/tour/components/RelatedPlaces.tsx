import { Icon } from '@/components/icon';
import { Image } from '@/components/ui';

interface Props {
  profiles: TypeProfile[];
  previewProfile: TypeProfile;
}

const RelatedPlaces = ({ profiles, previewProfile }: Props) => (
  <div className="flex flex-col gap-8 w-full mb-[128px]">
    <div className="flex flex-col gap-y-4">
      <h3 className="text-black text-[18px] leading-[28px] md:text-[24px] md:leading-[36px] font-medium">
        Xem thêm
      </h3>

      <div className="h-[1px] w-full bg-gray_900" />
    </div>

    <div className="flex flex-col md:flex-row gap-y-9">
      <div className="flex flex-col w-full md:w-[50%] gap-y-6">
        {profiles.map(p => {
          return (
            <div key={p.id} className="flex flex-col md:flex-row gap-x-6 gap-y-2">
              <Image
                src={p.avatar}
                className="rounded-[12px] md:h-[188px] aspect-[4/3] [&_>_img]:!object-cover"
              />

              <div className="flex flex-col flex-1 justify-between gap-y-2">
                <div className="flex flex-col">
                  <h4 className="text-[16px] text-black leading-[24px] md:text-[20px] md:leading-[28px] font-medium">
                    {p.name}
                  </h4>
                  <div className="flex flex-col gap-y-1">
                    {p.link.map(l => {
                      return (
                        <a href={l.link} target="_blank">
                          <p className="line-clamp-2 text-[13px] leading-[20px] font-normal text-gray_500 underline">
                            {l.link}
                          </p>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className="line-clamp-3 text-[13px] leading-[20px] font-normal text-gray_500">
                    {p.description}
                  </p>
                  {/* <p className="text-[13px] leading-[20px] font-normal text-gray_500">
                  27 thg 1, 2024
                </p> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative flex justify-end w-full md:w-[50%]">
        <div className="relative w-full md:w-[80%] md:h-[400px]">
          <Image
            src={previewProfile.avatar}
            className="h-full w-full aspect-square rounded-[24px] [&_>_img]:!object-cover"
          />

          <div className="absolute bottom-5 px-4 flex gap-x-[6px]">
            <Icon name="marker" size={24} />

            <div>
              <h6 className="text-[14px] leading-[24px] font-medium text-white">
                {previewProfile.name}
              </h6>
              <p className="text-[12px] leading-[18px] font-normal text-white line-clamp-1">
                {previewProfile.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RelatedPlaces;
