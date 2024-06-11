import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import LoadingSpinner from "./Common/LoadingSpinner";
import { HideFooterForAdmin } from "./util/commonUtil";
import SkeletonPage from "./Common/Skeltons/SkeletonPage";
import Footer from "./Common/Footer/Footer";
import Header from "./Common/Header/Header";
import TopStrip from "./Common/Header/TopStrip";
import ProtectedRoute from "./Frontend_Views/Routes/ProtectedRoute";
import AdminProtectedRoute from "./Frontend_Views/Routes/AdminProtectedRoute";

// Themes
import ThemeOne from "./Common/StyledThemes/ThemeOne.json";
import { GlobalStyles } from "./Common/StyledComponents/GlobalStyles";

// CSS
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Advertisement from "./Common/Advertisement/Advertisement";
import ScrollToTop from "react-scroll-to-top";

// Lazy Loading

const PageNotFound = lazy(
  () => import("./Frontend_Views/Pages/404/PageNotFound")
);
const Home = lazy(() => import("./Frontend_Views/Pages/Home/index"));
const About = lazy(() => import("./Frontend_Views/Pages/About/About"));
const Contact = lazy(() => import("./Frontend_Views/Pages/Contact/Contact"));
const Products = lazy(() => import("./Frontend_Views/Pages/Products/index"));
const ProductDetails = lazy(
  () => import("./Frontend_Views/Pages/Products/ProductDetails")
);
const Careers = lazy(() => import("./Frontend_Views/Pages/Careers/Careers"));
const CareerDetails = lazy(
  () => import("./Frontend_Views/Pages/Careers/career-details")
);
const Team = lazy(() => import("./Frontend_Views/Pages/Teams/Team"));
const NewsAndUpdates = lazy(
  () => import("./Frontend_Views/Pages/News/NewsAndUpdates")
);
const TestimonialsList = lazy(
  () => import("./Frontend_Views/Pages/Testimonials/TestimonialsList")
);

const Login = lazy(() => import("./Frontend_Admin/Pages/Auth/Login"));
const Registration = lazy(
  () => import("./Frontend_Admin/Pages/Auth/Registration")
);
const ChangePassword = lazy(
  () => import("./Frontend_Admin/Pages/Auth/ChangePassword")
);
const ResetPassword = lazy(
  () => import("./Frontend_Admin/Pages/Auth/ResetPassword")
);
const ResetPasswordConfirmation = lazy(
  () => import("./Frontend_Admin/Pages/Auth/ResetPasswordConfirmation")
);
const Activation = lazy(() => import("./Frontend_Admin/Pages/Auth/Activation"));
const ResendActivationEmail = lazy(
  () => import("./Frontend_Admin/Pages/Auth/ResendActivationEmail")
);
const UserAdmin = lazy(() => import("./Frontend_Admin/Pages/Auth/UserAdmin"));
const UnauthorizedPage = lazy(
  () => import("./Frontend_Admin/Pages/Login/UnauthorizedPage")
);
const ContactUSAdmin = lazy(
  () => import("./Frontend_Admin/Pages/Auth/ContactUSAdmin")
);
const PagesConfiguration = lazy(
  () => import("./Frontend_Admin/Pages/Auth/PagesConfiguration")
);
const UserPagePermission = lazy(
  () => import("./Frontend_Admin/Pages/Auth/UserPagePermission")
);
const AdminTestimonial = lazy(
  () => import("./Frontend_Admin/Pages/Login/AdminTestimonial")
);

function App() {
  const { isLoading } = useSelector((state) => state.loader);

  const isHideMenu = HideFooterForAdmin();
  const [flashAdd, setFlashAdd] = useState(false);

  useEffect(() => {
    setFlashAdd(false);
  }, []);

  // Google Language Translator

  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       includedLanguages: "es,en",
  //     },
  //     "google_translate_element"
  //   );
  // };
  // useEffect(() => {
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);

  // End of Google Language Translator

  return (
    <>
      {/* Google Language Translator */}
      <div id="google_translate_element"></div>
      {/* End of Google Language Translator */}

      {flashAdd && <Advertisement setFlashAdd={setFlashAdd} />}
      <ThemeProvider theme={ThemeOne}>
        <GlobalStyles />
        <BrowserRouter>
          {isLoading ? <LoadingSpinner /> : ""}
          <TopStrip />
          <Header />
          <Suspense fallback={<SkeletonPage />}>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/admin/change_password"
                  element={<ChangePassword />}
                />

                <Route
                  path="/admin/contactUSList"
                  element={<ContactUSAdmin />}
                />
              </Route>

              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin/userAdmin" element={<UserAdmin />} />
                <Route
                  path="/admin/userPermission"
                  element={<UserPagePermission />}
                />
                <Route
                  path="/admin/adminPagesConfigurtion"
                  element={<PagesConfiguration />}
                />
              </Route>

              <Route exact path="*" element={<PageNotFound />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/products" element={<Products />} />
              <Route exact path="/categories/:id" element={<Products />} />
              <Route exact path="/products/:id/" element={<ProductDetails />} />
              <Route exact path="/careers" element={<Careers />} />
              <Route
                exact
                path="/career-details/:id/"
                element={<CareerDetails />}
              />
              <Route exact path="/team" element={<Team />} />

              <Route exact path="/news" element={<NewsAndUpdates />} />
              <Route
                exact
                path="/testimonials"
                element={<TestimonialsList />}
              />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Registration />} />

              <Route exact path="/reset_password" element={<ResetPassword />} />
              <Route
                exact
                path="/password/reset/:uid/:token"
                element={<ResetPasswordConfirmation />}
              />
              <Route
                exact
                path="/activate/:uid/:token"
                element={<Activation />}
              />
              <Route
                exact
                path="/resend_activation"
                element={<ResendActivationEmail />}
              />

              <Route
                exact
                path="/unauthorized"
                element={<UnauthorizedPage />}
              />
              <Route exact path="/testimonial" element={<AdminTestimonial />} />
            </Routes>
          </Suspense>

          {!isHideMenu && <Footer />}
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer autoClose={2000} theme="colored" />
      <ScrollToTop
        smooth
        color="#fff"
        height="20"
        className="shadow rounded-circle scrollTop"
      />
    </>
  );
}

export default App;
