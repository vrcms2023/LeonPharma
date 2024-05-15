import React, { useEffect, useState } from "react";

// Components
import Ancher from "../../../Common/Ancher";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import Carousel from "../../Components/Carousel";
import Testimonials from "../../Components/Testimonials";
import ModelBg from "../../../Common/ModelBg";
import AdminBanner from "../../../Admin/Components/forms/ImgTitleIntoForm-List";
import BriefIntroAdmin from "../../../Admin/Components/BriefIntro/";

import EditIcon from "../../../Common/AdminEditIcon";
import ABrief from "../../Components/ABrief";
import ABriefAbout from "../../Components/ABriefAbout";
import HomeNews from "../../Components/HomeNews";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { removeActiveClass } from "../../../util/ulrUtil";
import {
  getCarouselFields,
  getFormDynamicFields,
  getTestimonialsFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";

import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";
// Styles

import "./Home.css";
import Features from "../../Components/Features";

import Banner from "../../../Common/Banner";
import ImageInputsForm from "../../../Admin/Components/forms/ImgTitleIntoForm";

import { sortByFieldName } from "../../../util/commonUtil";

const Home = () => {
  const editComponentObj = {
    carousel: false,
    briefIntro: false,
    projects: false,
    testmonial: false,
  };

  const pageType = "home";
  const [testimonis, setTestmonis] = useState([]);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [news, setNews] = useState([]);
  const [clientsList, setClientsList] = useState([]);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(value);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/testimonials/clientTestimonials/`
        );
        if (response?.status === 200) {
          const _testimonialsList = sortByFieldName(
            response.data.results,
            "testimonial_position"
          );
          setTestmonis(_testimonialsList);
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.testmonial) {
      getTestimonial();
    }
  }, [componentEdit.testmonial]);

  useEffect(() => {
    const getClientList = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/client/getAllClientLogos/`
        );
        if (response?.status === 200) {
          const _clientList = sortByFieldName(
            response.data.results,
            "client_position"
          );

          setClientsList(_clientList);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getClientList();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 p-0 position-relative homePage">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("banner", true)} />
            )}
            <Banner
              getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
              bannerState={componentEdit.banner}
            />
          </div>
        </div>
        {componentEdit.banner ? (
          <div className="adminEditTestmonial">
            <ImageInputsForm
              editHandler={editHandler}
              componentType="banner"
              pageType={`${pageType}-banner`}
              imageLabel="Banner Image"
              showDescription={false}
              showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
              dimensions={imageDimensionsJson("banner")}
            />
          </div>
        ) : (
          ""
        )}

        {/* Carousel */}
        <div className="row">
          <div className="col-md-12 p-0 carousel">
            {isAdmin && hasPermission && <EditIcon editHandler={editHandler} />}
            <Carousel carouselState={componentEdit.carousel} />
          </div>
        </div>

        {componentEdit.carousel && (
          <div className="adminEditTestmonial">
            <AdminBanner
              editHandler={editHandler}
              componentType="carousel"
              getImageListURL="carousel/createCarousel/"
              deleteImageURL="carousel/updateCarousel/"
              imagePostURL="carousel/createCarousel/"
              imageUpdateURL="carousel/updateCarousel/"
              imageIndexURL="carousel/updateCarouselindex/"
              imageLabel="Add Carousel Image"
              showDescription={false}
              showExtraFormFields={getCarouselFields("carousel")}
              dimensions={imageDimensionsJson("carousel")}
            />
          </div>
        )}

        {/* Introduction */}
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("briefIntro", true)} />
        )}
        <div className="row my-4">
          <BriefIntroFrontend
            introState={componentEdit.briefIntro}
            pageType="Home"
          />
          <div className="d-flex justify-content-center align-items-center">
            <Ancher
              AncherLabel="Know More About"
              Ancherpath="/about"
              AncherClass="btn btn-outline d-flex justify-content-center align-items-center gap-3"
              AnchersvgColor="#17427C"
            />
          </div>
        </div>

        {componentEdit.briefIntro ? (
          <div className="adminEditTestmonial">
            <BriefIntroAdmin
              editHandler={editHandler}
              componentType="briefIntro"
              pageType="Home"
            />
          </div>
        ) : (
          ""
        )}

        {/* HOME List of Services  */}
        {/* <div className="container py-5 homeServices">
          <h2 className="mb-5">What We Do</h2>
          <HomeServices />
        </div>
        */}

        {/* Features */}
        <Features />

        {/* HOME WHY CHOOSE RISHSYSTEMS */}
        <div className="row ABriefAbout mb-5">
          <ABriefAbout
            cssClass="mb-2 fw-bold title text-black"
            dimensions={imageDimensionsJson("whoweare")}
          />
        </div>

        {/*  HOME Services */}
        <div className="row">
          <div className="col-md-12 ABrief">
            <ABrief
              cssClass="fw-bold title"
              dimensions={imageDimensionsJson("homeCareers")}
            />
          </div>

          <div className="col-md-12 p-5 testimonials text-center">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("testmonial", true)} />
            )}
            {/* Testimonials */}
            {testimonis.length < 1 ? (
              (testimonis.length, "No Testimonials Found")
            ) : testimonis.length === 1 ? (
              <h4>Please add 2 or more testimonials.</h4>
            ) : testimonis.length > 1 ? (
              <Testimonials testimonis={testimonis} />
            ) : (
              ""
            )}
            {/* {testimonis.length > 0 ? (
              <Testimonials testimonis={testimonis} />
            ) : (
              ""
            )} */}
          </div>
        </div>

        {/* HOME News */}
        <div className="row py-5 homeNews">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="container">
              <h2 className="mb-5 fw-bold">News</h2>
              <div className="row">
                <HomeNews news={news} setNews={setNews} pagetype={pageType} />
              </div>
            </div>
          </div>
        </div>

        {/* HOME Careers */}
        <div className="row homeCareers py-5">
          <div className="col-lg-6"></div>
          <div className="col-md-12 col-lg-6 pe-lg-5">
            <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              pageType="careers"
            />
            <div className="bg-white px-5 pb-4 d-flex justify-content-center align-items-center">
              <Ancher
                AncherLabel="Careers"
                Ancherpath="/careers"
                AncherClass="btn btn-primary d-flex justify-content-center align-items-center gap-3 w-50"
                AnchersvgColor="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>

      {componentEdit.testmonial ? (
        <div className="adminEditTestmonial">
          <AdminBanner
            editHandler={editHandler}
            componentType="testmonial"
            getImageListURL="testimonials/clientTestimonials/"
            deleteImageURL="testimonials/updateTestimonials/"
            imagePostURL="testimonials/createTestimonials/"
            imageUpdateURL="testimonials/updateTestimonials/"
            imageIndexURL="testimonials/updateTestimonialsindex/"
            imageLabel="Add your Image"
            titleTitle="Testmonial Name"
            descriptionTitle="Testimonial Writeup "
            showDescription={false}
            showExtraFormFields={getTestimonialsFields("testmonial")}
            dimensions={imageDimensionsJson("testimonial")}
          />
        </div>
      ) : (
        ""
      )}

      {componentEdit.projects ? (
        <div className="adminEditTestmonial">
          <AdminBanner editHandler={editHandler} componentType="projects" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
      {/* {showEditPop && <ModelBg />} */}
    </>
  );
};

export default Home;
