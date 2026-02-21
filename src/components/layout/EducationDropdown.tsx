'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import type { NavItem } from '@/types'
import { cn } from '@/lib/utils'

interface EducationDropdownProps {
  item: NavItem
}

export function EducationDropdown({ item }: EducationDropdownProps) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={cn(
              'inline-flex items-center gap-1 font-medium text-sm transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky rounded px-1',
              'text-uqa-dark hover:text-uqa-deep-blue'
            )}
          >
            {item.label}
            <svg
              className={cn('w-4 h-4 transition-transform duration-200', open && 'rotate-180')}
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <Menu.Items className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl bg-white shadow-xl border border-uqa-gray-light overflow-hidden z-50 focus:outline-none">
              <div className="py-1.5">
                {item.children?.map((child) => (
                  <Menu.Item key={child.href}>
                    {({ active }) => (
                      <Link
                        href={child.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'block px-4 py-2.5 text-sm transition-colors duration-150',
                          active
                            ? 'bg-uqa-gray-bg text-uqa-deep-blue'
                            : 'text-uqa-dark'
                        )}
                      >
                        {child.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
