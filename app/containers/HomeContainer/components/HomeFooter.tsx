import Link from 'next/link';
import {
  FOOTER_COPYRIGHT,
  FOOTER_CREDIT_TEXT,
  FOOTER_CREDIT_LINK,
  FOOTER_CREDIT_HREF,
} from '../../../constants';

const HomeFooter = () => (
  <footer className='py-[20px] px-10 text-center bg-[#d4c9a8] text-text-700 font-sans text-[13px] flex items-center justify-between gap-3 relative z-10'>
    <p className='m-0 tracking-[0.02em]'>{FOOTER_COPYRIGHT}</p>
    <p className='m-0 tracking-[0.02em]'>
      {FOOTER_CREDIT_TEXT}{' '}
      <Link
        href={FOOTER_CREDIT_HREF}
        className='text-text-700/85 no-underline hover:underline'
      >
        {FOOTER_CREDIT_LINK}
      </Link>
    </p>
  </footer>
);

export default HomeFooter;
