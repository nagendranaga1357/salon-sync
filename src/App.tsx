import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Main from "./pages/Main";
import ServiceListing from "./pages/ServiceListing";
import SalonDetails from "./pages/SalonDetails";
import HomeServices from "./pages/HomeServices";
import HomeProviderDetails from "./pages/HomeProviderDetails";
import AllProviders from "./pages/AllProviders";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import SlotTiming from "./pages/SlotTiming";
import PaymentMethod from "./pages/PaymentMethod";
import BookingConfirmation from "./pages/BookingConfirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pages without bottom navbar */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/slot-timing" element={<SlotTiming />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          
          {/* Pages with bottom navbar */}
          <Route path="/main" element={<MainLayout><Main /></MainLayout>} />
          <Route path="/service-listing" element={<MainLayout><ServiceListing /></MainLayout>} />
          <Route path="/salon-details" element={<MainLayout><SalonDetails /></MainLayout>} />
          <Route path="/home-services" element={<MainLayout><HomeServices /></MainLayout>} />
          <Route path="/home-provider-details" element={<MainLayout><HomeProviderDetails /></MainLayout>} />
          <Route path="/all-providers" element={<MainLayout><AllProviders /></MainLayout>} />
          <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
          <Route path="/my-bookings" element={<MainLayout><MyBookings /></MainLayout>} />
          <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
