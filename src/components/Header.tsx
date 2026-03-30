'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Locale } from '@/lib/i18n'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MegaMenu, type NavColumn, type NavFeatured } from './MegaMenu'

export interface NavItemData {
  label: string
  href?: string
  columns?: NavColumn[]
  featured?: NavFeatured
}

interface HeaderProps {
  locale: Locale
  items: NavItemData[]
  ctaLink: { label: string; href: string }
  brandLegal: string
  aria: {
    closeMenu: string
    openMenu: string
    mainNav: string
    mobileNav: string
  }
}

const CLOSE_DELAY_MS = 180

export function Header({ locale, items, ctaLink, brandLegal, aria }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const homeHref = `/${locale}`

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setActiveMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMenu(null)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const openMenu = useCallback((key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(key)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY_MS)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-200',
        scrolled || activeMenu
          ? 'shadow-[0_1px_12px_rgba(26,13,38,0.09)]'
          : 'border-b border-ink/[0.07]'
      )}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">

          {/* Logo */}
          <Link
            href={homeHref}
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label={brandLegal}
          >
            <Image
              src="/NewLogoDR.svg"
              alt={brandLegal}
              width={1790}
              height={830}
              className="h-8 sm:h-9 w-auto"
              priority
              unoptimized
            />
          </Link>

          {/* Navigation desktop */}
          <nav aria-label={aria.mainNav} className="hidden md:flex items-center">
            <ul className="flex items-center">
              {items.map((item) => {
                const hasMega = !!item.columns?.length
                const key = item.href ?? item.label
                const isActive = item.href
                  ? item.href === homeHref
                    ? pathname === homeHref
                    : pathname.startsWith(item.href)
                  : false
                const isMenuOpen = activeMenu === key

                return (
                  <li
                    key={key}
                    onMouseEnter={() => (hasMega ? openMenu(key) : setActiveMenu(null))}
                    onMouseLeave={() => (hasMega ? scheduleClose() : undefined)}
                  >
                    {hasMega ? (
                      <button
                        type="button"
                        onClick={() => setActiveMenu(isMenuOpen ? null : key)}
                        aria-haspopup="true"
                        aria-expanded={isMenuOpen}
                        className={cn(
                          'flex items-center gap-1 px-3.5 py-2 font-body text-sm rounded',
                          'transition-colors duration-150',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                          isActive || isMenuOpen ? 'text-gold' : 'text-ink/70 hover:text-ink'
                        )}
                      >
                        {item.label}
                        <Icon
                          name="chevron"
                          size={12}
                          strokeWidth={2.5}
                          className={cn(
                            'transition-transform duration-150 text-muted/60',
                            isMenuOpen ? '-rotate-90' : 'rotate-90'
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href!}
                        className={cn(
                          'relative flex items-center px-3.5 py-2 font-body text-sm rounded',
                          'transition-colors duration-150',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                          isActive ? 'text-gold' : 'text-ink/70 hover:text-ink'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                        {isActive && (
                          <span className="absolute bottom-0.5 left-3.5 right-3.5 h-px bg-gold/40 rounded-full" />
                        )}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Droite */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} variant="light" />
            <Link
              href={ctaLink.href}
              className="hidden sm:inline-flex btn-primary text-xs py-2.5 px-5"
            >
              {ctaLink.label}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                'md:hidden inline-flex items-center justify-center w-8 h-8 rounded',
                'text-ink/60 hover:text-ink transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold'
              )}
              aria-label={mobileOpen ? aria.closeMenu : aria.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <Icon name="close" size={18} /> : <Icon name="menu" size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega-menus */}
      {items.map((item) => {
        if (!item.columns?.length) return null
        const key = item.href ?? item.label
        return (
          <MegaMenu
            key={key}
            isOpen={activeMenu === key}
            columns={item.columns}
            featured={item.featured}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          />
        )
      })}

      {/* Drawer mobile */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden absolute left-0 right-0 top-full bg-white border-t border-ink/[0.06]',
          'transition-all duration-250 overflow-hidden',
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label={aria.mobileNav}>
          <ul className="container-main pt-2 pb-5 flex flex-col">
            {items.map((item) => {
              const key = item.href ?? item.label
              return <MobileItem key={key} item={item} locale={locale} />
            })}
            <li className="flex items-center justify-between gap-4 mt-2 pt-4 border-t border-ink/[0.06] px-1">
              <LanguageSwitcher currentLocale={locale} variant="light" />
              <Link href={ctaLink.href} className="btn-primary text-xs py-2 px-4">
                {ctaLink.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function MobileItem({ item, locale }: { item: NavItemData; locale: Locale }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const hasMega = !!item.columns?.length

  if (hasMega) {
    return (
      <li className="border-b border-ink/[0.05] last:border-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={cn(
            'w-full flex items-center justify-between gap-3 px-1 py-3.5',
            'font-body text-sm text-ink/75',
            'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded'
          )}
        >
          {item.label}
          <Icon
            name="chevron"
            size={12}
            strokeWidth={2}
            className={cn(
              'transition-transform duration-150 text-muted/40',
              open ? '-rotate-90' : 'rotate-90'
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-250',
            open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="pb-3 space-y-3">
            {item.columns!.map((col) => (
              <div key={col.title}>
                <p className="font-body text-[9.5px] font-semibold text-muted/50 tracking-[0.14em] uppercase mb-1 px-1">
                  {col.title}
                </p>
                <ul className="flex flex-col">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block px-3 py-2.5 font-body text-sm text-ink/70 hover:text-ink transition-colors duration-150 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </li>
    )
  }

  const isActive = item.href
    ? item.href === `/${locale}`
      ? pathname === `/${locale}`
      : pathname.startsWith(item.href)
    : false

  return (
    <li className="border-b border-ink/[0.05] last:border-0">
      <Link
        href={item.href!}
        className={cn(
          'flex items-center px-1 py-3.5 font-body text-sm rounded',
          'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
          isActive ? 'text-gold' : 'text-ink/75 hover:text-ink'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </Link>
    </li>
  )
}
