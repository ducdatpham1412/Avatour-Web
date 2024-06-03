import { Icon } from '@/components/icon';
import { Image } from '@/components/ui';

const RelatedPlaces = () => (
  <div className="flex flex-col gap-8 w-full mb-[128px]">
    <div className="flex flex-col gap-y-4">
      <h3 className="text-black text-[18px] leading-[28px] md:text-[24px] md:leading-[36px] font-medium">
        Xem thêm
      </h3>

      <div className="h-[1px] w-full bg-gray_900" />
    </div>

    <div className="flex flex-col md:flex-row gap-y-9">
      <div className="flex flex-col w-full md:w-[50%] gap-y-6">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-x-6 gap-y-2 cursor-pointer">
            <Image
              src="https://s3-alpha-sig.figma.com/img/f8ef/8aa3/9a95bcf19cb519eeceadf46a4cac1dd9?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R6oL-KEmCfNNQmruAYhIEdhbhFv6ZddnZHgjsx1z43Fh7qAYgSVZmd4eCIEj1gstW6aMbSDi5oHT~GoAz0aW2OSTefXnZL65pO8gn8QAaX~-LlMc25iv7k6vXYhTau-I0PhrlBUKp0HPIxhnCu8BCDqplkKSHSMEh9xmJMXIu0geq0YWXGaaZ6qxFkBFVlugPcdonzoijqswJaTFdyWWx8D5-5NNjLX4dLzO0AWcxB4CnNeyo0DB3uppx6PG6-G7634Fm3x~8XXkWw5uMaAzdKgX8Uw-GeM7B8as1IabxafWmqP7iKNCispxA6LB~PUOeSlBQFyXEMy6ogjVY6K53g__"
              className="rounded-[12px] md:h-[188px] aspect-[4/3] [&_>_img]:!object-cover"
            />

            <div className="flex flex-col flex-1 justify-between gap-y-2">
              <div className="flex flex-col">
                <h4 className="text-[16px] text-black leading-[24px] md:text-[20px] md:leading-[28px] font-medium">
                  Điện Kính Thiên - công trình kiến trúc đặc sắc thời nhà Lê
                </h4>
                <p className="line-clamp-1 text-[13px] leading-[20px] font-normal text-gray_500">
                  https://vinpearl.com/vi/dien-kinh-thien-cong-trinh-kien-truc-dac-sac-thoi-nha-le
                </p>
              </div>

              <div className="flex flex-col">
                <p className="line-clamp-2 text-[13px] leading-[20px] font-normal text-gray_500">
                  Điện Kính Thiên được coi là công trình đáng chú ý nhất trong khu di tích lịch sử
                  Hoàng thành Thăng Long. Thông qua việc khám phá Điện Kính Thiên, du khách sẽ có cơ
                  hội tìm hiểu sâu hơn về di sản lịch sử, văn hóa, kiến trúc và nghệ thuật của người
                  Việt qua nhiều thế kỷ.
                </p>
                <p className="text-[13px] leading-[20px] font-normal text-gray_500">
                  27 thg 1, 2024
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex justify-end w-full md:w-[50%]">
        <div className="relative w-full md:w-[80%] md:h-[400px] cursor-pointer">
          <Image
            src="https://s3-alpha-sig.figma.com/img/4d40/380d/9f754facd81248d7326a47ca2ff55b52?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OdSEaqCLFQIy1RNeSKy~QVtxHJ50~g2TGL2GL~dKSlQwt9ItIzA6yFjE1xGtY8QTJhaOMJEGsbG0nNtME0eqe~6EHaZIpvo1P~dCtsZegH88X4nNMHPPvuiBBau57QYqCZNyEFwfBGBWPWBz9dBY5isoaAN9gRWmImz4LkfOyVdphurSYTTShLW43yMrHSkAnfwkMUFEm5SktGMC6ZZk5-0HrmP9Ec8vFgTy1QBRWXzVaBV71vAXxPlLrbpnxbjU0mH8F3DgAZDqbrXA19OnZxgcrX-8Rv7FaUhHAT0bO403WPDZEzqbVD-xTjqzqrwcSzyRMxV9UdyWFevhmz1G8Q__"
            className="h-full w-full aspect-square rounded-[24px] [&_>_img]:!object-cover"
          />

          <div className="absolute bottom-5 left-6 flex gap-x-[6px]">
            <Icon name="marker" size={24} />

            <div>
              <h6 className="text-[14px] leading-[24px] font-medium text-white">Cầu Long Biên</h6>
              <p className="text-[12px] leading-[18px] font-normal text-white">Long Biên, Hà Nội</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RelatedPlaces;
