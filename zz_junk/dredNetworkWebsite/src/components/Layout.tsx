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
      { title: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    title: 'Core concepts',
    links: [
      { title: 'Understanding Dred', href: '/docs/understanding-dred' },
    ],
  },
  {
    title: 'Ecosystem guides',
    links: [
      { title: 'Operating a Dred node', href: '/docs/node-operations' },
      { title: 'Registering a Neighbor', href: '/docs/register-neighbor' },
      { title: 'Context', href: '/docs/context' },
    ],
  },
  {
    title: 'API reference',
    links: [
      { title: 'Dred Client', href: '/docs/api-DredClient' },
    ],
  },
  {
    title: 'Contributing',
    links: [
      { title: 'How to contribute', href: '/docs/how-to-contribute' },
      { title: 'Architecture guide', href: '/docs/architecture-guide' },
      { title: 'Design principles', href: '/docs/design-principles' },
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
    <div id="layout-root" className="min-h-screen w-full bg-white dark:bg-slate-900">
      {/* Header */}
      <header id="main-header" className="sticky top-0 z-50 flex w-full flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8 dark:bg-transparent">
        <div id="mobile-menu-button" className="mr-6 flex lg:hidden">
          <button type="button" className="relative" aria-label="Open navigation">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" className="h-6 w-6 stroke-slate-500">
              <path d="M4 7h16M4 12h16M4 17h16"></path>
            </svg>
          </button>
        </div>
        <div id="header-logo" className="relative flex flex-grow basis-0 items-center">
          <a aria-label="Home page" href="/">
            <svg aria-hidden="true" viewBox="0 0 36 36" fill="none" className="h-9 w-9 lg:hidden">
              <g fill="none" stroke="#38BDF8" strokeLinejoin="round" strokeWidth="3">
                <path d="M10.308 5L18 17.5 10.308 30 2.615 17.5 10.308 5z"></path>
                <path d="M18 17.5L10.308 5h15.144l7.933 12.5M18 17.5h15.385L25.452 30H10.308L18 17.5z"></path>
              </g>
            </svg>
            <svg aria-hidden="true" viewBox="0 0 227 36" fill="none" className="hidden h-9 w-auto fill-slate-700 dark:fill-sky-100 lg:block">
              <g fill="none" stroke="#38BDF8" strokeLinejoin="round" strokeWidth="3">
                <path d="M10.308 5L18 17.5 10.308 30 2.615 17.5 10.308 5z"></path>
                <path d="M18 17.5L10.308 5h15.144l7.933 12.5M18 17.5h15.385L25.452 30H10.308L18 17.5z"></path>
              </g>
              <text x="38.8" y="25.5" fill="#ffffff" fontWeight="bold" fontSize="x-large">DRED</text>
            </svg>
          </a>
        </div>
        <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
          <button type="button" className="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 dark:md:bg-slate-800/75 dark:md:ring-inset dark:md:ring-white/5 dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500 lg:w-96">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400">
              <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z"></path>
            </svg>
            <span className="sr-only md:not-sr-only md:ml-2 md:text-slate-500 md:dark:text-slate-400">Search docs</span>
          </button>
        </div>
        <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
          <a target="_blank" className="group" aria-label="GitHub" href="https://github.com/cardano-after-dark/dred">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300">
              <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"></path>
            </svg>
          </a>
        </div>
      </header>

      <div id="layout-content" className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        {/* Sidebar */}
        <div id="sidebar-wrapper" className="hidden lg:relative lg:block lg:flex-none">
          <div id="sidebar-bg" className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden"></div>
          <div id="sidebar-divider-top" className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
          <div id="sidebar-divider" className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block"></div>
          <div id="sidebar-content" className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
            <nav id="main-nav" className="text-base lg:text-sm w-64 pr-8 xl:w-72 xl:pr-16">
              <ul id="nav-sections" role="list" className="space-y-9">
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
        <div id="main-content" className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          {children}
        </div>

        {/* Right sidebar - On this page */}
        <div id="toc-sidebar" className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav id="toc-nav" aria-labelledby="on-this-page-title" className="w-56">
            <h2 id="on-this-page-title" className="font-display text-sm font-medium text-slate-900 dark:text-white">
              On this page
            </h2>
            <ol id="toc-list" role="list" className="mt-4 space-y-3 text-sm">
              {/* This will be populated by the page content */}
            </ol>
          </nav>
        </div>
      </div>

      {/* Dark mode toggle */}
      <button
        id="theme-toggle"
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