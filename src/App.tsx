import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import InterviewerCreator from "./components/InterviewerCreator";
import InterviewSetup from "./components/InterviewSetup";
import InterviewRoom from "./components/InterviewRoom";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create-interviewer" element={<InterviewerCreator />} />
          <Route path="/interview-setup" element={<InterviewSetup />} />
          <Route path="/interview-room" element={<InterviewRoom />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
       
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;