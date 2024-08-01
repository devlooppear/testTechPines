import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "../pages/NoPage";
import Home from "../pages/Home";
import Layout from "../common/Layout";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Discographies from "../pages/Discographies";
import Tracks from "../pages/Tracks";

const RouterComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[75vh] bg-neutral-300 shadow-inherit">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="tracks" element={<Tracks />} />
              <Route path="discographies" element={<Discographies />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default RouterComponent;
