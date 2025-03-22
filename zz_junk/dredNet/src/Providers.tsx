import { DredCapoProvider } from "./DredCapoProvider"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DredCapoProvider>
      {children}
    </DredCapoProvider>
  )
}