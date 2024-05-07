import localFont from 'next/font/local';

import { Poppins } from 'next/font/google';

const PoppinsFont = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const CalSans = localFont({
  variable: '--font-colsans',
  fallback: ['system-ui'],
  src: [
    {
      path: '../../public/fonts/CalSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

export { CalSans, PoppinsFont };
