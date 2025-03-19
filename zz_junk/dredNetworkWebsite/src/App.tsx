import { Layout } from './components/Layout'
import { Providers } from './Providers'
import './index.css'

interface QuickLinkProps {
  title: string
  description: string
  href: string
  icon: 'installation' | 'presets' | 'theming'
}

function QuickLink({ title, description, href, icon }: QuickLinkProps) {
  return (
    <div id={`quicklink-${icon}`} className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
      <div id={`quicklink-${icon}-gradient`} className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"></div>
      <div id={`quicklink-${icon}-content`} className="relative overflow-hidden rounded-xl p-6">
        <svg id={`quicklink-${icon}-icon`} aria-hidden="true" viewBox="0 0 32 32" fill="none" className="h-8 w-8 [--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]">
          {icon === 'installation' && (
            <>
              <circle cx="12" cy="12" r="12" fill="url(#installation-gradient)"></circle>
              <path d="m8 8 9 21 2-10 10-2L8 8Z" fillOpacity="0.5" className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </>
          )}
          {icon === 'presets' && (
            <>
              <circle cx="20" cy="12" r="12" fill="url(#presets-gradient)"></circle>
              <g className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]" fillOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 5v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"></path>
                <path d="M18 17v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V17a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2Z"></path>
                <path d="M18 5v4a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2Z"></path>
                <path d="M3 25v2a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"></path>
              </g>
            </>
          )}
          {icon === 'theming' && (
            <>
              <circle cx="12" cy="20" r="12" fill="url(#theming-gradient)"></circle>
              <path d="M27 12.13 19.87 5 13 11.87v14.26l14-14Z" className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]" fillOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M3 3h10v22a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V3Z" className="fill-[var(--icon-background)]" fillOpacity="0.5"></path>
              <path d="M3 9v16a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4V9M3 9V3h10v6M3 9h10M3 15h10M3 21h10" className="stroke-[color:var(--icon-foreground)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M29 29V19h-8.5L13 26c0 1.5-2.5 3-5 3h21Z" fillOpacity="0.5" className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </>
          )}
        </svg>
        <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
          <a href={href}>
            <span className="absolute -inset-px rounded-xl"></span>
            {title}
          </a>
        </h2>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">{description}</p>
      </div>
    </div>
  )
}

export function App() {
  return (
    <Layout>
        <Providers>
          <div id="hero-wrapper" className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
            <div id="hero-container" className="p-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
              <div id="hero-grid" className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:px-8 xl:gap-x-16 xl:px-12">
                <div id="hero-content" className="relative z-10 md:text-center lg:text-left col-span-full">
                  <div className="absolute inset-0 -z-10 overflow-hidden">
                    <img id="hero-blur-effect-1" alt="" src="/blur-cyan.svg" width="240" height="240" decoding="async" 
                      className="absolute left-0 top-0 blur-2xl" />
                  </div>
                  <div id="hero-text" className="relative max-w-3xl mx-auto">
                    <p id="hero-title" className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                      Decentralized REDIS state channels
                    </p>
                    <p id="hero-subtitle" className="mt-3 text-2xl tracking-tight text-slate-400">
                      Realtime message channels for dApps
                    </p>
                    <div id="hero-cta" className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                      <a className="rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500" href="/docs/installation">
                        Get started
                      </a>
                      <a className="rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400" target="_blank" href="https://github.com/cardano-after-dark/dred">
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Providers>
        
      <div className="prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800">
        <p className="lead">
          Learn how to get Dred set up in your project in under thirty minutes or it's free.
        </p>

        <div id="quick-links-grid" className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <QuickLink
            title="Installation"
            description="Step-by-step guides to setting up your system and installing the library."
            href="/docs/installation"
            icon="installation"
          />
          <QuickLink
            title="Architecture guide"
            description="Learn how the internals work and contribute."
            href="/docs/architecture-guide"
            icon="presets"
          />
          <QuickLink
            title="API reference"
            description="Learn to easily customize and modify your app's visual design to fit your brand."
            href="/docs/api-DredClient"
            icon="theming"
          />
        </div>

        <hr />

        <h2 id="quick-start">Quick Start</h2>
        <p>In this guide you will learn ...</p>

        <h3 id="what-is-dred">What is Dred</h3>
        <p>
          Dred is a real-time messaging protocol that's designed specifically for decentralized applications (dApps).
          The protocol enables multiple users to have a shared stream of updates, with any authorized player being able to add content.
          With Dred, application developers don't have to operate messaging servers themselves - the protocol is served in a decentralized manner by multiple servers.
        </p>

        <h3 id="dependencies">Dependencies</h3>
        <ul>
          <li>Docker</li>
          <li>Node.js</li>
          <li>npm</li>
          <li>pnpm</li>
        </ul>

        <h3 id="configuring-the-library">Configuring the library</h3>
        <p>
          To get started with Dred, you'll need to configure your server. Here's a basic example:
        </p>

        <pre className="language-js">
          <code>
            {`// dredServer.config.js
export default {
    serverId: 'x1b42yum',
    neighborhoods: [
        'cardano-after-dark',
    ],
    listenAddress: "191.168.42.42",
    port: "4242"
}`}
          </code>
        </pre>

        <div className="my-8 flex rounded-3xl p-6 bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10">
          <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="h-8 w-8 flex-none [--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]">
            <defs>
              <radialGradient cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" id="gradient" gradientTransform="matrix(0 21 -21 0 20 11)">
                <stop stopColor="#0EA5E9"></stop>
                <stop stopColor="#22D3EE" offset=".527"></stop>
                <stop stopColor="#818CF8" offset="1"></stop>
              </radialGradient>
            </defs>
            <circle cx="20" cy="20" r="12" fill="url(#gradient)"></circle>
            <path fillRule="evenodd" clipRule="evenodd" d="M20 24.995c0-1.855 1.094-3.501 2.427-4.792C24.61 18.087 26 15.07 26 12.231 26 7.133 21.523 3 16 3S6 7.133 6 12.23c0 2.84 1.389 5.857 3.573 7.973C10.906 21.494 12 23.14 12 24.995V27a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.005Z" className="fill-[var(--icon-background)]" fillOpacity="0.5"></path>
            <path d="M25 12.23c0 2.536-1.254 5.303-3.269 7.255l1.391 1.436c2.354-2.28 3.878-5.547 3.878-8.69h-2ZM16 4c5.047 0 9 3.759 9 8.23h2C27 6.508 21.998 2 16 2v2Zm-9 8.23C7 7.76 10.953 4 16 4V2C10.002 2 5 6.507 5 12.23h2Zm3.269 7.255C8.254 17.533 7 14.766 7 12.23H5c0 3.143 1.523 6.41 3.877 8.69l1.392-1.436ZM13 27v-2.005h-2V27h2Zm1 1a1 1 0 0 1-1-1h-2a3 3 0 0 0 3 3v-2Zm4 0h-4v2h4v-2Zm1-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2Zm0-2.005V27h2v-2.005h-2ZM8.877 20.921C10.132 22.136 11 23.538 11 24.995h2c0-2.253-1.32-4.143-2.731-5.51L8.877 20.92Zm12.854-1.436C20.32 20.852 19 22.742 19 24.995h2c0-1.457.869-2.859 2.122-4.074l-1.391-1.436Z" className="fill-[var(--icon-foreground)]"></path>
          </svg>
          <div className="ml-4 flex-auto">
            <p className="m-0 font-display text-xl text-sky-900 dark:text-sky-400">You should know!</p>
            <div className="mt-2.5 text-sky-800 dark:text-slate-300">
              <p>
                Make sure to replace the serverId, neighborhoods, listenAddress, and port with your own values.
                The serverId should be unique across your network.
              </p>
            </div>
          </div>
        </div>

        <hr />

        <h2 id="open-source">Open Source</h2>
        <p>
          This is an open source project. You can have it for free, you can contribute improvements,
          and you can try to request information from the developers. Keep in mind it's not guaranteed
          you'll get immediate feedback, as OpenSource developers tend to be very busy trying to survive
          by means of creating free software projects.
        </p>

        <h2 id="getting-help">Getting help</h2>
        <p>
          If you need help setting up Dred or if there are questions regarding Dred please feel free to{' '}
          <a href="https://forms.gle/B2yaMNDcnHdmDtJH6">contact us</a>
        </p>

        <h3 id="join-the-community">Join the community</h3>
        <p>
          Dred is currently developed by the core team, any contributions to the project are welcome.
          Also if you want to stay up to date, learn or get to know some of the amazing People behind this Project join us at{' '}
          <a href="https://twitter.com/cardanafterdark">twitter</a>,{' '}
          <a href="https://discord.gg/VwxRdEBwBE">discord</a> or{' '}
          <a href="https://t.me/CardanoAfterDark">telegram</a>.
        </p>
      </div>
    </Layout>
  )
}

export default App 