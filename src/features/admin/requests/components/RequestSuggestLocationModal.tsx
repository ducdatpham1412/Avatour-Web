import { cloneElement } from 'react';

import { Icon } from '@/components/icon';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Divider,
  Image,
} from '@/components/ui';

import withRequest from '../hoc/withRequest';
import Badge from './Badge';

// const serviceMap: Record<number, string> = {
//   2: 'Food tour',
//   3: 'Cắm trại',
//   4: 'Đi phượt',
//   5: 'Team building',
// };

const RequestSuggestLocationModal = withRequest<'suggest_location'>(
  ({ data, children, open, openOpenChange, submiting, onConfirm, active }) => (
    <>
      {cloneElement(children, { ...children.props, onClick: () => openOpenChange(true) })}
      <Dialog open={open} onOpenChange={e => openOpenChange(e)}>
        <DialogContent
          closeButton={
            <div className="p-[10px]">
              <Icon name="close" size={16} />
            </div>
          }
          className="!w-min min-w-[550px] h-min xl:max-h-[calc(100vh_-_40px)] xl max-w-full max-h-full bg-white gap-3 overflow-hidden !rounded-2xl"
        >
          <DialogHeader className="font-bold text-[18px]">Chi tiết yêu cầu</DialogHeader>
          <div className="w-full">
            <div className="h-[3px] w-[200%] -translate-x-1/3">
              <Divider size="md" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={data.creator_avatar}
                  className="w-[32px] h-[32px] min-w-[32px] rounded-full bg-gray_300 [&_>_img]:!object-cover"
                />
                <span className="font-bold">{data.creator_name}</span>
              </div>
              <Badge type={data.type} />
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-[600]">Thông tin địa điểm được gợi ý</span>
              <ul className="list-[disc] pl-[30px] flex flex-col gap-4">
                <li>
                  <span className="font-bold">Tên địa điểm:</span> <span>{data.data.name}</span>
                </li>
                <li>
                  <span className="font-bold">Kinh độ vĩ độ:</span>{' '}
                  <span>
                    {data.data.info?.lat} {data.data.info?.lng}
                  </span>
                </li>
                <li>
                  <span className="font-bold">Thời gian trải nghiệm:</span>{' '}
                  <span>{data.data.info?.duration}</span>
                </li>
                <li>
                  <span className="font-bold">Mô hình địa điểm:</span> <span>Địa điểm</span>
                </li>
                <li>
                  <span className="font-bold">Loại hình trải nghiệm:</span>{' '}
                  <span>
                    {/* {data.data.services.map((s, index) =>
                      index < data.data.services.length - 1 ? `${serviceMap[s]}, ` : serviceMap[s],
                    )} */}
                  </span>
                </li>
                <li>
                  <span className="font-bold">Chi phí:</span>{' '}
                  <span>
                    {data.data.info?.min_cost} - {data.data.info?.max_cost}
                  </span>
                </li>
                <li>
                  <span className="font-bold">Hình ảnh:</span> <div className="mt-2"></div>
                  <Image
                    src={data.data.avatar}
                    className="w-[200px] h-[130px] rounded-2xl overflow-hidden"
                  />
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter className="flex flex-row gap-2 !items-end !justify-center pt-[25px] pb-[5px]">
            <Button
              variant="secondary"
              className="rounded-full w-[180px] h-[39px] font-bold"
              onClick={() => openOpenChange(false)}
            >
              Quay lại
            </Button>
            {active && (
              <Button
                className="rounded-full w-[180px] h-[39px] font-bold"
                onClick={onConfirm}
                loading={submiting}
              >
                Duyệt yêu cầu
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  ),
);

export default RequestSuggestLocationModal;
