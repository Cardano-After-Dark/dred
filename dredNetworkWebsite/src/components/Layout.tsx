import { ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import clsx from 'clsx'

interface LayoutProps {
  children: ComponentChildren
}

const navigation = [
  {
    title: 'Introduction',
    links: [
      { title: 'Getting started', href: '/' },
      { title: 'Installation', href: '/installation' },
    ],
  },
  {
    title: 'Core concepts',
    links: [
      { title: 'Understanding Dred', href: '/understanding-dred' },
    ],
  },
  {
    title: 'Ecosystem guides',
    links: [
      { title: 'Operating a Dred node', href: '/node-operations' },
      { title: 'Registering a Neighbor', href: '/register-neighbor' },
      { title: 'Context', href: '/context' },
    ],
  },
]

export function Layout({ children }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 dark:border-slate-800 lg:block">
        <div className="flex h-full flex-col overflow-y-auto bg-white px-6 py-8 dark:bg-slate-900">
          <nav className="flex-1">
            <ul role="list" className="space-y-9">
              {navigation.map((section) => (
                <li key={section.title}>
                  <h2 className="font-display font-medium text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                  <ul
                    role="list"
                    className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4"
                  >
                    {section.links.map((link) => (
                      <li key={link.href} className="relative">
                        <a
                          href={link.href}
                          className={clsx(
                            'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                            link.href === window.location.pathname
                              ? 'font-semibold text-sky-500 before:bg-sky-500'
                              : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                          )}
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {/* Dark mode toggle */}
      <button
        type="button"
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-slate-200 shadow-lg dark:bg-white dark:text-slate-900"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    </div>
  )
} 