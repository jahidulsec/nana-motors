import { cn } from '@/lib/utils'
import React from 'react'

const Section = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return (
    <section className={cn('bg-card px-6 py-3 rounded-md mt-5 border border-muted', className)}>
        {children}
    </section>
  )
}

export default Section