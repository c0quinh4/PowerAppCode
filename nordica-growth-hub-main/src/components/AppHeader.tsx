import { useLocation } from "react-router-dom";

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/evaluation": "Evaluation",
  "/pdi": "PDI",
  "/team": "Team",
  "/analytics": "Analytics",
  "/feedback": "Feedback",
  "/settings": "Configurações",
};

export function AppHeader() {
  const location = useLocation();
  const currentPage = pageNames[location.pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-primary-medium">NGH</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-base font-medium text-foreground">{currentPage}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-medium">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-semibold text-foreground">NCS</span>
        </div>
      </div>
    </header>
  );
}
