export interface MetadataProps {
  title?: string;
  keywords?: string;
  descriptions?: string;
}

const Metadata = ({ title, keywords, descriptions }: MetadataProps) => {
  return (
    <>
      <title>{title ?? 'Avatour'}</title>
      <meta name="keywords" content={`Avatour,Du lịch bản địa,${keywords ?? ''}`} />
      <meta
        name="description"
        content={`Avatour là ứng dụng gợi ý lịch trình, giúp bạn kết nối với người dân bản địa để trải nghiệm đậm nét các văn hoá địa phương.${
          descriptions ? ` ${descriptions}` : ''
        }`}
      />
      <meta name="author" content="Avatour Du lịch bản địa" />
    </>
  );
};

export default Metadata;
