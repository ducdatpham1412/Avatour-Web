import type { PropsWithChildren } from "react";

const SearchResultLayout = ({ children }: PropsWithChildren) => (
  <div className="px-5 pb-[92px] sm:px-40 pt-8 sm:pt-[66px] w-full flex flex-col gap-7">
    {children}
  </div>
);

export default SearchResultLayout;
