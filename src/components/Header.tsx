import Head from 'next/head';

interface Props {
  title?: string;
  keywords?: string;
  descriptions?: string;
}

const Header = ({ title, keywords, descriptions }: Props) => {
  return (
    <Head>
      <title>{'sdfjsdfsdkfjk'}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={descriptions} />
      <meta name="author" content="Avatour Du lịch bản địa" />
    </Head>
  );
};

export default Header;
