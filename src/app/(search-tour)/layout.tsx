import { Lexend } from 'next/font/google';
import type { PropsWithChildren } from 'react';

const lexendFont = Lexend({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const SearchTourLayout = ({ children }: PropsWithChildren) => (
  <main style={lexendFont.style}>{children}</main>
);

export default SearchTourLayout;
