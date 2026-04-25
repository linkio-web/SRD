'use client';
import { LogoCloud } from '@/components/ui/logo-cloud';

type PartnerLogo = {
  src: string;
  alt: string;
};

type PartnersSectionProps = {
  overline: string;
  title: string;
  logos: readonly PartnerLogo[];
};

export function PartnersSection({ overline, title, logos }: PartnersSectionProps) {
  return (
    <div className="container-main py-12 sm:py-16">
      <div className="text-center mb-8">
        <span className="section-label text-white/50">{overline}</span>
        <p className="font-display text-lg sm:text-xl font-light text-white/70 mt-1">
          {title}
        </p>
      </div>
      <LogoCloud logos={logos as unknown as PartnerLogo[]} />
    </div>
  );
}
