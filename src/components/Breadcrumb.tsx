import Link from 'next/link'
import { Icon } from '@/lib/icons'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-10">
      <ol className="flex items-center flex-wrap gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && (
                <Icon
                  name="chevron"
                  size={11}
                  strokeWidth={2}
                  className="text-muted/40 rotate-90 shrink-0"
                  aria-hidden="true"
                />
              )}
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="font-body text-xs text-muted/60 hover:text-navy transition-colors duration-150
                             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="font-body text-xs text-navy font-medium"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
