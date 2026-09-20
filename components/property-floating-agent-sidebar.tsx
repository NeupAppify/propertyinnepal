import type { ReactNode } from "react";

type PropertyFloatingAgentSidebarProps = {
  children: ReactNode;
};

export function PropertyFloatingAgentSidebar({
  children,
}: PropertyFloatingAgentSidebarProps) {
  return (
    <aside className="pointer-events-none hidden lg:absolute lg:top-0 lg:bottom-[var(--property-content-bottom-space)] lg:left-1/2 lg:z-30 lg:block lg:w-full lg:max-w-[1440px] lg:-translate-x-1/2 lg:px-8">
      <div className="pointer-events-auto sticky top-28 ml-auto max-h-[calc(100dvh-136px)] w-[360px] overflow-y-auto rounded-[1.6rem] shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
        {children}
      </div>
    </aside>
  );
}
