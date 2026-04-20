import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Portfolio from "@/pages/Portfolio";
import { LangProvider, useLang } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  const { lang } = useLang();
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="contents">
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LangProvider>
          <AppShell />
        </LangProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
