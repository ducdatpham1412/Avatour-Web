import { OtherProfile } from '@/features/profile';

type Props = PageProps<{ user_id: number }>;

const page = ({ params }: Props) => {
  return <OtherProfile userId={params.user_id} />;
};

export default page;
