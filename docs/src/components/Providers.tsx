import { DredCapoProvider } from "./DredCapoProvider.tsx"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DredCapoProvider>
      {children}
    </DredCapoProvider>
  )
}
