import { Background, Body } from "./components";


export default function SearchPage({ params }: PageProps) {
  console.log('params of search', params);

  return (
    <>
      <Background />
      <Body />
    </>
  );
}
