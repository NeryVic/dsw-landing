import { cn } from '@/lib/utils'

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white dark:bg-gray-800 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div
      className={cn('p-6 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div
      className={cn('p-6 pt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}