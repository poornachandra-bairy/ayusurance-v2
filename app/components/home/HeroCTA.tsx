import {
  HOME_FINAL_HEADING,
  HOME_FINAL_BODY,
  HOME_FINAL_CTA,
} from '../../constants';

interface Props {
  divRef: React.RefObject<HTMLDivElement | null>;
}

const HeroCTA = ({ divRef }: Props) => (
  <div
    ref={divRef}
    className='absolute top-1/2 left-1/2 z-10 text-center text-white w-full max-w-[560px] pointer-events-auto flex flex-col items-center gap-6 opacity-0 will-change-[transform,opacity]'
    style={{ transform: 'translate(-50%, -50%)' }}
  >
    <h2
      className='m-0 font-serif font-semibold leading-[1.1] tracking-[-0.01em] text-white'
      style={{ fontSize: '3rem', textShadow: '0 4px 24px rgba(0,0,0,0.35)' }}
    >
      {HOME_FINAL_HEADING}
    </h2>

    <p
      className='m-0 font-sans text-[1.05rem] text-white leading-[1.65]'
      style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
    >
      {HOME_FINAL_BODY}
    </p>

    <button className='mt-2 inline-block px-7 py-3 rounded-xl text-[0.9375rem] font-medium text-white btn-gradient shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5'>
      {HOME_FINAL_CTA}
    </button>
  </div>
);

export default HeroCTA;
