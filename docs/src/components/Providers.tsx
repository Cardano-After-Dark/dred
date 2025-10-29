import { DredCapoProvider } from "dred-network-registry";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DredCapoProvider>{children}</DredCapoProvider>
    </>
  );
};
