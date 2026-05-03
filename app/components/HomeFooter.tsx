import Link from 'next/link';
import {
  FOOTER_COPYRIGHT,
  FOOTER_CREDIT_TEXT,
  FOOTER_CREDIT_LINK,
  FOOTER_CREDIT_HREF,
} from '../constants';

const HomeFooter = () => (
  <footer
    className="py-[60px] px-5 text-center font-sans text-[13px] flex flex-col gap-3 relative z-10"
    style={{
      background: '#1A3020',
      color: 'rgba(240,234,224,0.65)',
      borderTop: '1px solid #1E3828',
    }}
  >
    <p className="m-0 tracking-[0.02em]">{FOOTER_COPYRIGHT}</p>
    <p className="m-0 tracking-[0.02em]">
      {FOOTER_CREDIT_TEXT}{' '}
      <Link href={FOOTER_CREDIT_HREF} className="no-underline hover:underline" style={{ color: '#C49050' }}>
        {FOOTER_CREDIT_LINK}
      </Link>
    </p>
  </footer>
);

export default HomeFooter;
