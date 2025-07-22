import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Booking from "@/pages/booking";
import Services from "@/pages/services";
import Barbers from "@/pages/barbers";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/booking" component={Booking} />
      <Route path="/services" component={Services} />
      <Route path="/barbers" component={Barbers} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
