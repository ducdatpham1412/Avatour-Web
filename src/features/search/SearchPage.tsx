import { useRouter } from '@/hooks';
import Body from './Body';
import LocationTag, { LocationTagProps } from './components/LocationTag';
import SearchResult from './components/SearchResult';

export default function SearchPage({ searchParams, params }: PageProps) {
  console.log('params of search', params);

  return <Body searchData={parseSearchData(params.search_text)} />;
}

const SearchPageResult = async ({ searchParams, params }: PageProps) => {
  const data = await getData();

  return <SearchResult data={data} />;
};

async function getData() {
  await delay(1000);
  return [
    {
      id: '1',
      title: 'Dòng chảy ngàn năm lịch sử Hà Nội',
      tags: ['Văn hoá', 'Lịch sử'],
      image:
        'https://s3-alpha-sig.figma.com/img/759c/4dd4/3fd8a3b12185fcb2933888b8fade83c5?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qKLO-N-goLr~n2ccPkBdoip~bPdya0vti7fCiPgDnWCBSf8nDXiwlF13Vu05EU-S8LuIDcCgwjHeDtI4ABKzN1OncoSzHBvb73U5-kCFY9cL0EkQy7eEzNSahL6yVLILvK1MtD0DoS2Dvfm6nE6ZfT8yNXozxRWfrOD~4chulZaLTGy0fxQ4fgi5yxOP9aHrfx5LV8XBjUJ4SY2c8Omsgsm-fz0qv-sgeaAT5ipbol9WvwMTYN~ptwFbH8K2mIH-bTI9YJwlENvW0J7XbPgAvMOFk0HR1dcQBRlYH0xvnRaM5QHRKIrI8r7nhZ15bfpUH0jjFQM-n4xwSyvkCMu63w__',
      price: 300000,
      details: ['4 điểm tham quan', '2 bảo tàng', '4 nhà hàng'],
      timeline: [
        [
          {
            title: 'Hoàng Thành Thăng Long',
            image:
              'https://s3-alpha-sig.figma.com/img/bfa1/0688/b925f51e03416bc6e4bc9ce35e5fce30?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C~JOyFujWoXzM5osSTAupTQSrC2bpCylNM-Km0p8ELyIxVXKjHhfhjhnoIrMtCiPIW4njn4oPq~6p-JtK7~~Va7v4Kni3wyXnOc0m6ZkdErdAZWbxAjDVCD3vcAzo5jrzh2sOhoel0~xwsXWV8wAFYqfZehLqsWPqmTsQ7-VigE5JW069rMbNVuvfWWzzm1Rfsc3mDsmWdoMqBpBbmzvgb42SDrktGvaKciHY2Ft3uNA4CyzdnVdKM9yA51bhUdzcsi~61eVfivkOuyAV6vKBS26c2juFbAbehM0d5N2TzIBlgNkJx7onUfiucGjulEAgrBlukWPkPJl0gifvhgIRQ__',
            tag: 'Di sản văn hoá',
            duration: 4500000,
          },
          {
            title: 'Cột cờ Hà Nội',
            image:
              'https://s3-alpha-sig.figma.com/img/45ab/9f3e/fea8ae438f597a6d6f69924ea4e26d2d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Js6VRAcmFrFxGFt2z7s5NvZP2ObtulSOW6n~PwSPhavaMuq5IC0E7ujYJrdAjuNJpQ8tqOP5E29uffSwQMck7dJcCuH0SmBdJBkpyeVVdRVadwh7n2J99hQpCC-ik9X-etIBTLnzU0p8M00srFhcyYeEU-q1hRJZUJOriADw-W60lZcTUGp1pVWgDM79~Cmk9b~c2nFttSsG0DyQB44NtfsYORKS1HOfnQ50oYbZOyk6bMEX6OoU7vviS5tgWgLeQLW6vRhh9DXV2j4wpiggf1wRLwylxCj7fVCktZBHTKTy3c1v6DvOvYJBq-DOpTkBnza6Qm6xW6NX85h60zH8Pw__',
            tag: 'Di tích lịch sử',
            duration: 1800000,
          },
          {
            title: 'Nhà hàng Tầm Vị',
            image:
              'https://s3-alpha-sig.figma.com/img/5717/f3ce/4988e1abb892302394a0df173a3d6a74?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q-Z3nCxNIpzvWN~zmANh9YfN8ytVROfiPx-xoeH0ldmpd5yF4rt7ETdnjEqXn0t3bJnnLnQm-MKaGCNMsraTG6nkH9QvlEnHLjDKX7WhhdbLb-Q51cTMYbczyRJDp8dL8rjO6YXEr7hJtUHq6UL4KJBvJuDyYy8mJvxyROpMYwLj--UN5Z8l-ESR5g1nKHTX6KfIlEyeBlgxgjEic-jmh2fXduqujT~mrPc5cbuoCxFWNVVohH~QClKHoYD-qfEyVxF7zpj2O59GPXczSimXwZeFl6BNi-aBNfzqDa1jyAWBLYQ3f6Gh0GCx9qFOirkq~BUNBnsBukt8RMdVHxNi4Q__',
            tag: 'Nhà hàng',
            duration: 3600000,
          },
        ],
        [
          {
            title: 'Nhà tù Hoả Lò',
            image:
              'https://s3-alpha-sig.figma.com/img/1e0c/78b4/d1fa6ea4fa79cc77fe4dfc898121c654?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=byW3msnLKjjSOtkxEdU~BnxsnX0PFhFdE240r~YP7~YYuunv7dTCdjb60QqaXJl9dDLnoxE~-furOnRwS1-uvMlMk7vbSUsCBMnL87v-4GTxSgZQw~wZVZAiiOaIrGzpworHkj2fANWFs6sQslNiHQrQQp5VCPYqp9fBp4TjS2IzW0imx1p7aSubGhQiTViXpX8A3an4f3w36wye5OVC1JOlxTrtK5-XVJeu46-U0P2-ZfM~LStp1ALpwoHCPUK8zlBO1ecoS7h25RGQMIJyeYKAilf9T7cnhZ7JL1iSfGEpV7ZyX-odg8ti7GMh8RYmLv2P93qh2AztCOMfFVpwGg__',
            tag: 'Di tích lịch sử',
            duration: 4500000,
          },
          {
            title: 'Cột cờ Hà Nội',
            image:
              'https://s3-alpha-sig.figma.com/img/45ab/9f3e/fea8ae438f597a6d6f69924ea4e26d2d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Js6VRAcmFrFxGFt2z7s5NvZP2ObtulSOW6n~PwSPhavaMuq5IC0E7ujYJrdAjuNJpQ8tqOP5E29uffSwQMck7dJcCuH0SmBdJBkpyeVVdRVadwh7n2J99hQpCC-ik9X-etIBTLnzU0p8M00srFhcyYeEU-q1hRJZUJOriADw-W60lZcTUGp1pVWgDM79~Cmk9b~c2nFttSsG0DyQB44NtfsYORKS1HOfnQ50oYbZOyk6bMEX6OoU7vviS5tgWgLeQLW6vRhh9DXV2j4wpiggf1wRLwylxCj7fVCktZBHTKTy3c1v6DvOvYJBq-DOpTkBnza6Qm6xW6NX85h60zH8Pw__',
            tag: 'Di tích lịch sử',
            duration: 1800000,
          },
          {
            title: 'Nhà hàng Tầm Vị',
            image:
              'https://s3-alpha-sig.figma.com/img/5717/f3ce/4988e1abb892302394a0df173a3d6a74?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q-Z3nCxNIpzvWN~zmANh9YfN8ytVROfiPx-xoeH0ldmpd5yF4rt7ETdnjEqXn0t3bJnnLnQm-MKaGCNMsraTG6nkH9QvlEnHLjDKX7WhhdbLb-Q51cTMYbczyRJDp8dL8rjO6YXEr7hJtUHq6UL4KJBvJuDyYy8mJvxyROpMYwLj--UN5Z8l-ESR5g1nKHTX6KfIlEyeBlgxgjEic-jmh2fXduqujT~mrPc5cbuoCxFWNVVohH~QClKHoYD-qfEyVxF7zpj2O59GPXczSimXwZeFl6BNi-aBNfzqDa1jyAWBLYQ3f6Gh0GCx9qFOirkq~BUNBnsBukt8RMdVHxNi4Q__',
            tag: 'Nhà hàng',
            duration: 3600000,
          },
        ],
      ],
    },
    {
      id: '2',
      title: 'Trải nghiệm nét đẹp phố cổ Hà Nội',
      tags: ['Văn hoá', 'Lịch sử'],
      image:
        'https://s3-alpha-sig.figma.com/img/eea2/51b4/c766f441748386f9338117c6875b641d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BSyncxsQPq7i~WXdbl8Ex9t~C7gnYqCKGasR8tTw7YefExN7Di2XhKYQp61DEhiGE3j~UPiNdGW2ohjOHxBvAOsihZGzM7qBSUINKEgHPL4TB-f-~A0iyY6yMh32lcdQi1LeUVDc0GYVBBCi3f-rsqa9mYv7B-bgYxUjoFWgxJlhsv2LjXm6DtQ-38Mixh18zpFjXqC3wQHZwkQrt-6IjBww2t-Le6XtJ2-NOIxPnyZArMDmX9LmL-2qHD539nleUAzAXoaZeaMHOBBSnT~AEUHe9IjkHfG3TZ14TsQQlPSlk03XF-41TA2Fbry0z0qIHKfvGDbk7Yz8QchpH3~9~A__',
      price: 450000,
      details: ['4 điểm tham quan', '2 bảo tàng', '4 nhà hàng'],
      timeline: [
        [
          {
            title: 'Cột cờ Hà Nội',
            image:
              'https://s3-alpha-sig.figma.com/img/45ab/9f3e/fea8ae438f597a6d6f69924ea4e26d2d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Js6VRAcmFrFxGFt2z7s5NvZP2ObtulSOW6n~PwSPhavaMuq5IC0E7ujYJrdAjuNJpQ8tqOP5E29uffSwQMck7dJcCuH0SmBdJBkpyeVVdRVadwh7n2J99hQpCC-ik9X-etIBTLnzU0p8M00srFhcyYeEU-q1hRJZUJOriADw-W60lZcTUGp1pVWgDM79~Cmk9b~c2nFttSsG0DyQB44NtfsYORKS1HOfnQ50oYbZOyk6bMEX6OoU7vviS5tgWgLeQLW6vRhh9DXV2j4wpiggf1wRLwylxCj7fVCktZBHTKTy3c1v6DvOvYJBq-DOpTkBnza6Qm6xW6NX85h60zH8Pw__',
            tag: 'Di tích lịch sử',
            duration: 1800000,
          },
          {
            title: 'Nhà hàng Tầm Vị',
            image:
              'https://s3-alpha-sig.figma.com/img/5717/f3ce/4988e1abb892302394a0df173a3d6a74?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q-Z3nCxNIpzvWN~zmANh9YfN8ytVROfiPx-xoeH0ldmpd5yF4rt7ETdnjEqXn0t3bJnnLnQm-MKaGCNMsraTG6nkH9QvlEnHLjDKX7WhhdbLb-Q51cTMYbczyRJDp8dL8rjO6YXEr7hJtUHq6UL4KJBvJuDyYy8mJvxyROpMYwLj--UN5Z8l-ESR5g1nKHTX6KfIlEyeBlgxgjEic-jmh2fXduqujT~mrPc5cbuoCxFWNVVohH~QClKHoYD-qfEyVxF7zpj2O59GPXczSimXwZeFl6BNi-aBNfzqDa1jyAWBLYQ3f6Gh0GCx9qFOirkq~BUNBnsBukt8RMdVHxNi4Q__',
            tag: 'Nhà hàng',
            duration: 3600000,
          },
          {
            title: 'Hoàng Thành Thăng Long',
            image:
              'https://s3-alpha-sig.figma.com/img/bfa1/0688/b925f51e03416bc6e4bc9ce35e5fce30?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C~JOyFujWoXzM5osSTAupTQSrC2bpCylNM-Km0p8ELyIxVXKjHhfhjhnoIrMtCiPIW4njn4oPq~6p-JtK7~~Va7v4Kni3wyXnOc0m6ZkdErdAZWbxAjDVCD3vcAzo5jrzh2sOhoel0~xwsXWV8wAFYqfZehLqsWPqmTsQ7-VigE5JW069rMbNVuvfWWzzm1Rfsc3mDsmWdoMqBpBbmzvgb42SDrktGvaKciHY2Ft3uNA4CyzdnVdKM9yA51bhUdzcsi~61eVfivkOuyAV6vKBS26c2juFbAbehM0d5N2TzIBlgNkJx7onUfiucGjulEAgrBlukWPkPJl0gifvhgIRQ__',
            tag: 'Di sản văn hoá',
            duration: 4500000,
          },
        ],
        [
          {
            title: 'Nhà tù Hoả Lò',
            image:
              'https://s3-alpha-sig.figma.com/img/1e0c/78b4/d1fa6ea4fa79cc77fe4dfc898121c654?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=byW3msnLKjjSOtkxEdU~BnxsnX0PFhFdE240r~YP7~YYuunv7dTCdjb60QqaXJl9dDLnoxE~-furOnRwS1-uvMlMk7vbSUsCBMnL87v-4GTxSgZQw~wZVZAiiOaIrGzpworHkj2fANWFs6sQslNiHQrQQp5VCPYqp9fBp4TjS2IzW0imx1p7aSubGhQiTViXpX8A3an4f3w36wye5OVC1JOlxTrtK5-XVJeu46-U0P2-ZfM~LStp1ALpwoHCPUK8zlBO1ecoS7h25RGQMIJyeYKAilf9T7cnhZ7JL1iSfGEpV7ZyX-odg8ti7GMh8RYmLv2P93qh2AztCOMfFVpwGg__',
            tag: 'Di tích lịch sử',
            duration: 4500000,
          },
          {
            title: 'Cột cờ Hà Nội',
            image:
              'https://s3-alpha-sig.figma.com/img/45ab/9f3e/fea8ae438f597a6d6f69924ea4e26d2d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Js6VRAcmFrFxGFt2z7s5NvZP2ObtulSOW6n~PwSPhavaMuq5IC0E7ujYJrdAjuNJpQ8tqOP5E29uffSwQMck7dJcCuH0SmBdJBkpyeVVdRVadwh7n2J99hQpCC-ik9X-etIBTLnzU0p8M00srFhcyYeEU-q1hRJZUJOriADw-W60lZcTUGp1pVWgDM79~Cmk9b~c2nFttSsG0DyQB44NtfsYORKS1HOfnQ50oYbZOyk6bMEX6OoU7vviS5tgWgLeQLW6vRhh9DXV2j4wpiggf1wRLwylxCj7fVCktZBHTKTy3c1v6DvOvYJBq-DOpTkBnza6Qm6xW6NX85h60zH8Pw__',
            tag: 'Di tích lịch sử',
            duration: 1800000,
          },
          {
            title: 'Nhà hàng Tầm Vị',
            image:
              'https://s3-alpha-sig.figma.com/img/5717/f3ce/4988e1abb892302394a0df173a3d6a74?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q-Z3nCxNIpzvWN~zmANh9YfN8ytVROfiPx-xoeH0ldmpd5yF4rt7ETdnjEqXn0t3bJnnLnQm-MKaGCNMsraTG6nkH9QvlEnHLjDKX7WhhdbLb-Q51cTMYbczyRJDp8dL8rjO6YXEr7hJtUHq6UL4KJBvJuDyYy8mJvxyROpMYwLj--UN5Z8l-ESR5g1nKHTX6KfIlEyeBlgxgjEic-jmh2fXduqujT~mrPc5cbuoCxFWNVVohH~QClKHoYD-qfEyVxF7zpj2O59GPXczSimXwZeFl6BNi-aBNfzqDa1jyAWBLYQ3f6Gh0GCx9qFOirkq~BUNBnsBukt8RMdVHxNi4Q__',
            tag: 'Nhà hàng',
            duration: 3600000,
          },
        ],
      ],
    },
    {
      id: '3',
      title: 'Hơi thở bản sắc nghệ thuật',
      tags: ['Văn hoá', 'Lịch sử'],
      image:
        'https://s3-alpha-sig.figma.com/img/9abd/052c/4e9e1a74331e48a42d8e2c4756d5c8c1?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hnUehzYkm5wRHJ6ceoZTh3R0uM19IeFZj4cBOahltSSNq~LA9ld9t9dXNuVNpc5j5ZWv0PQmv6sfTZWluaduMJlCPmsDXo3NGv7qaMt9od6ceNHrUPDu8y0pDSNzStd3oUCY8XLBUh6ebdYxjpQMEDbdh4MejTHs-Sm~HWJAUANWNFKjkowh1zRq7wGG8OwWBJjiD8kW-zh5~pPOyVzHuAPlj4YzJ5ymogbK8scbSwpZMXD-LygDpfG5qyPO1HYUmpRqkR2kKkls7-Hof7m6e9jy2CBWKavyMs25Cfzifl6l9tEYdlfbxYqsUJ9HoNSLuoRjZA1IC-dnRpZDNueAzg__',
      price: 350000,
      details: ['4 điểm tham quan', '2 bảo tàng', '4 nhà hàng'],
      timeline: [
        [
          {
            title: 'Cột cờ Hà Nội',
            image:
              'https://s3-alpha-sig.figma.com/img/45ab/9f3e/fea8ae438f597a6d6f69924ea4e26d2d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Js6VRAcmFrFxGFt2z7s5NvZP2ObtulSOW6n~PwSPhavaMuq5IC0E7ujYJrdAjuNJpQ8tqOP5E29uffSwQMck7dJcCuH0SmBdJBkpyeVVdRVadwh7n2J99hQpCC-ik9X-etIBTLnzU0p8M00srFhcyYeEU-q1hRJZUJOriADw-W60lZcTUGp1pVWgDM79~Cmk9b~c2nFttSsG0DyQB44NtfsYORKS1HOfnQ50oYbZOyk6bMEX6OoU7vviS5tgWgLeQLW6vRhh9DXV2j4wpiggf1wRLwylxCj7fVCktZBHTKTy3c1v6DvOvYJBq-DOpTkBnza6Qm6xW6NX85h60zH8Pw__',
            tag: 'Di tích lịch sử',
            duration: 1800000,
          },
          {
            title: 'Hoàng Thành Thăng Long',
            image:
              'https://s3-alpha-sig.figma.com/img/bfa1/0688/b925f51e03416bc6e4bc9ce35e5fce30?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C~JOyFujWoXzM5osSTAupTQSrC2bpCylNM-Km0p8ELyIxVXKjHhfhjhnoIrMtCiPIW4njn4oPq~6p-JtK7~~Va7v4Kni3wyXnOc0m6ZkdErdAZWbxAjDVCD3vcAzo5jrzh2sOhoel0~xwsXWV8wAFYqfZehLqsWPqmTsQ7-VigE5JW069rMbNVuvfWWzzm1Rfsc3mDsmWdoMqBpBbmzvgb42SDrktGvaKciHY2Ft3uNA4CyzdnVdKM9yA51bhUdzcsi~61eVfivkOuyAV6vKBS26c2juFbAbehM0d5N2TzIBlgNkJx7onUfiucGjulEAgrBlukWPkPJl0gifvhgIRQ__',
            tag: 'Di sản văn hoá',
            duration: 4500000,
          },

          {
            title: 'Nhà hàng Tầm Vị',
            image:
              'https://s3-alpha-sig.figma.com/img/5717/f3ce/4988e1abb892302394a0df173a3d6a74?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q-Z3nCxNIpzvWN~zmANh9YfN8ytVROfiPx-xoeH0ldmpd5yF4rt7ETdnjEqXn0t3bJnnLnQm-MKaGCNMsraTG6nkH9QvlEnHLjDKX7WhhdbLb-Q51cTMYbczyRJDp8dL8rjO6YXEr7hJtUHq6UL4KJBvJuDyYy8mJvxyROpMYwLj--UN5Z8l-ESR5g1nKHTX6KfIlEyeBlgxgjEic-jmh2fXduqujT~mrPc5cbuoCxFWNVVohH~QClKHoYD-qfEyVxF7zpj2O59GPXczSimXwZeFl6BNi-aBNfzqDa1jyAWBLYQ3f6Gh0GCx9qFOirkq~BUNBnsBukt8RMdVHxNi4Q__',
            tag: 'Nhà hàng',
            duration: 3600000,
          },
        ],
        [
          {
            title: 'Nhà tù Hoả Lò',
            image:
              'https://s3-alpha-sig.figma.com/img/1e0c/78b4/d1fa6ea4fa79cc77fe4dfc898121c654?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=byW3msnLKjjSOtkxEdU~BnxsnX0PFhFdE240r~YP7~YYuunv7dTCdjb60QqaXJl9dDLnoxE~-furOnRwS1-uvMlMk7vbSUsCBMnL87v-4GTxSgZQw~wZVZAiiOaIrGzpworHkj2fANWFs6sQslNiHQrQQp5VCPYqp9fBp4TjS2IzW0imx1p7aSubGhQiTViXpX8A3an4f3w36wye5OVC1JOlxTrtK5-XVJeu46-U0P2-ZfM~LStp1ALpwoHCPUK8zlBO1ecoS7h25RGQMIJyeYKAilf9T7cnhZ7JL1iSfGEpV7ZyX-odg8ti7GMh8RYmLv2P93qh2AztCOMfFVpwGg__',
            tag: 'Di tích lịch sử',
            duration: 4500000,
          },
          {
            title: 'Cột cờ Hà Nội',
            image:
              'https://s3-alpha-sig.figma.com/img/45ab/9f3e/fea8ae438f597a6d6f69924ea4e26d2d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Js6VRAcmFrFxGFt2z7s5NvZP2ObtulSOW6n~PwSPhavaMuq5IC0E7ujYJrdAjuNJpQ8tqOP5E29uffSwQMck7dJcCuH0SmBdJBkpyeVVdRVadwh7n2J99hQpCC-ik9X-etIBTLnzU0p8M00srFhcyYeEU-q1hRJZUJOriADw-W60lZcTUGp1pVWgDM79~Cmk9b~c2nFttSsG0DyQB44NtfsYORKS1HOfnQ50oYbZOyk6bMEX6OoU7vviS5tgWgLeQLW6vRhh9DXV2j4wpiggf1wRLwylxCj7fVCktZBHTKTy3c1v6DvOvYJBq-DOpTkBnza6Qm6xW6NX85h60zH8Pw__',
            tag: 'Di tích lịch sử',
            duration: 1800000,
          },
          {
            title: 'Nhà hàng Tầm Vị',
            image:
              'https://s3-alpha-sig.figma.com/img/5717/f3ce/4988e1abb892302394a0df173a3d6a74?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q-Z3nCxNIpzvWN~zmANh9YfN8ytVROfiPx-xoeH0ldmpd5yF4rt7ETdnjEqXn0t3bJnnLnQm-MKaGCNMsraTG6nkH9QvlEnHLjDKX7WhhdbLb-Q51cTMYbczyRJDp8dL8rjO6YXEr7hJtUHq6UL4KJBvJuDyYy8mJvxyROpMYwLj--UN5Z8l-ESR5g1nKHTX6KfIlEyeBlgxgjEic-jmh2fXduqujT~mrPc5cbuoCxFWNVVohH~QClKHoYD-qfEyVxF7zpj2O59GPXczSimXwZeFl6BNi-aBNfzqDa1jyAWBLYQ3f6Gh0GCx9qFOirkq~BUNBnsBukt8RMdVHxNi4Q__',
            tag: 'Nhà hàng',
            duration: 3600000,
          },
        ],
      ],
    },
    {
      id: '4',
      title: 'Hương vị tinh hoa Hồ Tây',
      tags: ['Văn hoá', 'Lịch sử'],
      image:
        'https://s3-alpha-sig.figma.com/img/f228/f5ac/73428f6d000821593b6c6ed4922de429?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RznldTS09DwhOiGpzdR8yqCZY-jUsEZVK9jQI2giRN5mF1j6PWcKLK1kQNfIfdSuq0iaZhBO~oW7f626eZbAw7zyjp7-4uhW4cz1TW3KddKhB5uER136InkKElr~2gtlCyTpX~xN8OwBAVNCq6dsTLD33Otm5A6gmW8Amrp2~3Y7OKsKSnP~KY7H-UsIgVndIzTErNoJ5gvdbV3bOaoZlD3vF0g5X5oUa7IKFKZ1~qQZ6GpO4c8pC6o4QdFvYJNqqWExH8Etyni9lRYcxBJAz2LX~g03315k0JT3sKwiHTAUpp1qQQoZ~fPBA4vrijvSoNUvPlVxA2Jei-nQEzbrWA__',
      price: 500000,
      details: ['4 điểm tham quan', '2 bảo tàng', '4 nhà hàng'],
      timeline: [
        [
          {
            title: 'Hoàng Thành Thăng Long',
            image:
              'https://s3-alpha-sig.figma.com/img/bfa1/0688/b925f51e03416bc6e4bc9ce35e5fce30?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C~JOyFujWoXzM5osSTAupTQSrC2bpCylNM-Km0p8ELyIxVXKjHhfhjhnoIrMtCiPIW4njn4oPq~6p-JtK7~~Va7v4Kni3wyXnOc0m6ZkdErdAZWbxAjDVCD3vcAzo5jrzh2sOhoel0~xwsXWV8wAFYqfZehLqsWPqmTsQ7-VigE5JW069rMbNVuvfWWzzm1Rfsc3mDsmWdoMqBpBbmzvgb42SDrktGvaKciHY2Ft3uNA4CyzdnVdKM9yA51bhUdzcsi~61eVfivkOuyAV6vKBS26c2juFbAbehM0d5N2TzIBlgNkJx7onUfiucGjulEAgrBlukWPkPJl0gifvhgIRQ__',
            tag: 'Di sản văn hoá',
            duration: 4500000,
          },
          {
            title: 'Cột cờ Hà Nội',
            image:
              'https://s3-alpha-sig.figma.com/img/45ab/9f3e/fea8ae438f597a6d6f69924ea4e26d2d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Js6VRAcmFrFxGFt2z7s5NvZP2ObtulSOW6n~PwSPhavaMuq5IC0E7ujYJrdAjuNJpQ8tqOP5E29uffSwQMck7dJcCuH0SmBdJBkpyeVVdRVadwh7n2J99hQpCC-ik9X-etIBTLnzU0p8M00srFhcyYeEU-q1hRJZUJOriADw-W60lZcTUGp1pVWgDM79~Cmk9b~c2nFttSsG0DyQB44NtfsYORKS1HOfnQ50oYbZOyk6bMEX6OoU7vviS5tgWgLeQLW6vRhh9DXV2j4wpiggf1wRLwylxCj7fVCktZBHTKTy3c1v6DvOvYJBq-DOpTkBnza6Qm6xW6NX85h60zH8Pw__',
            tag: 'Di tích lịch sử',
            duration: 1800000,
          },
          {
            title: 'Nhà hàng Tầm Vị',
            image:
              'https://s3-alpha-sig.figma.com/img/5717/f3ce/4988e1abb892302394a0df173a3d6a74?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q-Z3nCxNIpzvWN~zmANh9YfN8ytVROfiPx-xoeH0ldmpd5yF4rt7ETdnjEqXn0t3bJnnLnQm-MKaGCNMsraTG6nkH9QvlEnHLjDKX7WhhdbLb-Q51cTMYbczyRJDp8dL8rjO6YXEr7hJtUHq6UL4KJBvJuDyYy8mJvxyROpMYwLj--UN5Z8l-ESR5g1nKHTX6KfIlEyeBlgxgjEic-jmh2fXduqujT~mrPc5cbuoCxFWNVVohH~QClKHoYD-qfEyVxF7zpj2O59GPXczSimXwZeFl6BNi-aBNfzqDa1jyAWBLYQ3f6Gh0GCx9qFOirkq~BUNBnsBukt8RMdVHxNi4Q__',
            tag: 'Nhà hàng',
            duration: 3600000,
          },
        ],
      ],
    },
  ] as LocationTagProps['data'][];
}

function parseSearchData(search: string | string[] | undefined) {
  return search ? (Array.isArray(search) ? search[0] : search) : '';
}

function delay(duration: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}

export { SearchPageResult };
