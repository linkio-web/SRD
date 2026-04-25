'use client';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[];
};

export function LogoCloud({ logos: baseLogos }: LogoCloudProps) {
  const logos = Array.from({ length: 8 }, () => baseLogos).flat();

  return (
    <div className="relative mx-auto max-w-3xl py-6">
      <InfiniteSlider gap={42} reverse speed={30} speedOnHover={10}>
        {logos.map((logo, index) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-5 select-none md:h-6 brightness-0 invert opacity-60"
            height="auto"
            key={`logo-${logo.alt}-${index}`}
            loading="lazy"
            src={logo.src}
            width="auto"
          />
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={0.25}
        className="pointer-events-none absolute top-0 left-0 h-full w-[60px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={0.25}
        className="pointer-events-none absolute top-0 right-0 h-full w-[60px]"
        direction="right"
      />
    </div>
  );
}
