'use client'

import { ReactNode } from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

interface FilterDrawerProps {
  trigger: ReactNode
  title?: string
  description?: string
  children: ReactNode
}

export function FilterDrawer({
  trigger,
  title = 'Filters',
  description = 'Refine results with advanced options',
  children,
}: FilterDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl p-6">
          <DrawerHeader className="px-0">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="mt-4">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
