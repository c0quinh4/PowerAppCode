import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import Dashboard from "./pages/Dashboard";
import Evaluation from "./pages/Evaluation";
import PDI from "./pages/PDI";
import Team from "./pages/Team";
import Analytics from "./pages/Analytics";
import Feedback from "./pages/Feedback";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <AppHeader />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/evaluation" element={<Evaluation />} />
                  <Route path="/pdi" element={<PDI />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
