'use client'

import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export default function FeatureWaveCard({
  animationNamespace = 'systems',
  className = '',
  contentClassName = '',
  badgeClassName = '',
  iconClassName = '',
  iconOnlyClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  buttonClassName = '',
  showBadge = true,
  showCta = true,
  showWave = true,
  badgeText,
  icon,
  title,
  description,
  ctaLabel,
  onCtaClick,
  buttonVariant = 'primary',
}) {
  const cardClass = `${animationNamespace}-card`
  const waveClass = `${animationNamespace}-wave`
  const waveRowClass = `${animationNamespace}-wave-row`

  return (
    <article className={cn(className, cardClass, 'will-change-transform')}>
      <div className={cn('relative z-10', contentClassName)}>
        {showBadge ? (
          <div className={cn('inline-flex items-center gap-2 rounded-xl border px-3 py-2 mb-4', badgeClassName)}>
            <span className={cn('w-8 h-8 rounded-lg border flex items-center justify-center text-base', iconClassName)}>
              <i className={icon}></i>
            </span>
            <span className="text-sm font-semibold">{badgeText}</span>
          </div>
        ) : (
          <div className={cn('w-11 h-11 rounded-lg flex items-center justify-center mb-5', iconOnlyClassName)}>
            <i className={cn(icon, 'text-xl')}></i>
          </div>
        )}

        <h2 className={cn('text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4 max-w-[18ch]', titleClassName)}>
          {title}
        </h2>

        <p className={cn('text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-6 max-w-[36ch]', descriptionClassName)}>
          {description}
        </p>

        {showCta && ctaLabel ? (
          <Button
            onClick={onCtaClick}
            variant={buttonVariant}
            size="sm"
            className={buttonClassName}
          >
            <span className="inline-flex items-center gap-2">
              {ctaLabel}
              <i className="ri-arrow-right-line"></i>
            </span>
          </Button>
        ) : null}
      </div>

      {showWave ? (
        <div className={cn('pointer-events-none absolute inset-x-0 bottom-0 h-14 overflow-hidden text-[11px] leading-3 font-mono text-blue-700/20 dark:text-blue-400/35 select-none', waveClass)}>
          <p className={cn('whitespace-pre px-6', waveRowClass)}># + * :   # x + :   # + * :   # x + :   # + * :   # x + :</p>
          <p className={cn('whitespace-pre px-6', waveRowClass)}>x # : +   * # : +   x # : +   * # : +   x # : +   * # : +</p>
          <p className={cn('whitespace-pre px-6', waveRowClass)}>+ : # *   + x : #   + : # *   + x : #   + : # *   + x : #</p>
          <p className={cn('whitespace-pre px-6', waveRowClass)}>: * + #   : * + x   : * + #   : * + x   : * + #   : * + x</p>
        </div>
      ) : null}
    </article>
  )
}
