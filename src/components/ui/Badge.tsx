import type { ReactNode } from 'react'
import './Badge.css'

type BadgeProps = {
  children: ReactNode
  ariaLabel?: string
  className?: string
  shape?: 'rounded' | 'pill'
}

const Badge = ({
  children,
  ariaLabel,
  className,
  shape = 'rounded',
}: BadgeProps) => {
  const classes = ['badge', `badge--${shape}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} aria-label={ariaLabel}>
      {children}
    </span>
  )
}

export default Badge
