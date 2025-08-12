import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./utils/protectedRoutes"
import AuthCheck from "./utils/authCheck"
import Loader from "./components/loader";
import { onMessage } from 'firebase/messaging';
import { messaging } from './notifications/firebase';
import { ShowToast } from "./components/showToast";

const AuthPage = React.lazy(()=> import('./pages/authentication/auth'));
const RegisterPage = React.lazy(()=> import('./pages/authentication/register'));
const HomePage = React.lazy(()=> import('./pages/hustler/home'));
const RegisterDetailsPage = React.lazy(()=> import('./pages/authentication/register_details'));
const LoginPage = React.lazy(()=> import('./pages/authentication/login'));
const ConfirmationPage = React.lazy(()=> import('./pages/authentication/confirmation'));
const MyHustlesPage = React.lazy(()=> import('./pages/hustler/myHustles'))
const SettingsPage = React.lazy(() => import('./pages/hustler/settings'))
const MyWalletPage = React.lazy(() => import('./pages/hustler/myWallet'))
const CreatorHomePage = React.lazy(() => import('./pages/creator/home'))
const MyCreatorHustlesPage = React.lazy(() => import('./pages/creator/myHustles'))
const NoAccessPage = React.lazy(() => import('./pages/authentication/no_access'))
const SearchPage = React.lazy(() => import('./pages/hustler/search'))

function App() {

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!isMobile){
    onMessage(messaging, (payload) => {
      ShowToast("success", payload.notification.body)
    })
  }

  if (!isMobile && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  } else {
    console.log("Skipping push notification setup on mobile devices.");
  }

  return (
    <React.Suspense fallback={<div className="flex justify-center items-center mt-12">
      <Loader/>
    </div>}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AuthCheck userRole="hustler" />}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/myHustles" element={<MyHustlesPage/>}/>
           
          </Route>
          <Route element={<AuthCheck userRole="creator" />}>
            <Route path="/creator/home" element={<CreatorHomePage/>}/>
            <Route path="/creator/hustles" element={<MyCreatorHustlesPage/>}/>
          </Route>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/myWallet" element={<MyWalletPage/>}/>
        </Route>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/register_details" element={<RegisterDetailsPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/no-access" element={<NoAccessPage/>}/>
        <Route path="/confirmation" element={<ConfirmationPage/>}/>
      </Routes>
    </React.Suspense>
  );
}

export default App;
