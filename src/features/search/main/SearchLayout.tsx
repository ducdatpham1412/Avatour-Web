import type { PropsWithChildren } from "react";

import Navbar from "@/components/Navbar";

const SearchLayout = ({ children }: PropsWithChildren) => (
  <div className="relative w-full min-h-[100vh] bg-white">
    <Navbar />
    {children}
  </div>
);

export default SearchLayout;
