import { DredCapoProvider } from "@/components/DredCapoProvider.jsx"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DredCapoProvider>
      {children}
    </DredCapoProvider>
  )
}
