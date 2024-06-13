import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

// Components
import Title from "../../../Common/Title";
import Ancher from "../../../Common/Ancher";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import Carousel from "../../Components/Carousel";
import Testimonials from "../../Components/Testimonials";
import ModelBg from "../../../Common/ModelBg";
import AdminBanner from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm-List";
import BriefIntroAdmin from "../../../Frontend_Admin/Components/BriefIntro/";
import EditIcon from "../../../Common/AdminEditIcon";
import ABrief from "../../Components/ABrief";
import ABriefAbout from "../../Components/ABriefAbout";
import HomeNews from "../../Components/HomeNews";
import HomeServices from "../../Components/HomeServices";
import ServiceOfferedComponent from "../../Components/ServiceOfferedComponent";
import Features from "../../Components/Features";
import { HomeClientItem } from "../../Components/HomeClientItem";

// Common Compoenents
import Banner from "../../../Common/Banner";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";
import { ImageGalleryStyled } from "../../../Common/StyledComponents/Styled-ImageGallery";
import { HomeClientsStyled } from "../../../Common/StyledComponents/Styled-HomeClients";

// Utilities
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { removeActiveClass } from "../../../util/ulrUtil";
import {
  getObjectPositionKey,
  sortByFieldName,
  genereateCategoryProducts,
} from "../../../util/commonUtil";
import {
  getCarouselFields,
  getTestimonialsFields,
  getTitleAndDescriptionFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";

// Styles
import "./Home.css";

// Images

import { ProductHilightsStyled } from "../../../Common/StyledComponents/Styled-Products-Hilights";
import { TestimonialCarouselPageStyled } from "../../../Common/StyledComponents/Styled-TestimonialCarousel";
import { ABriefIntroStyled } from "../../../Common/StyledComponents/Styled-ABriefAbout";
import { getAllCategories } from "../../../redux/products/categoryActions";
import Product from "../Products/Product";
import { SimpleTitleDescComponent } from "../../../Frontend_Admin/Components/BriefIntro/SimpleTitleDescComponent";
import DynamicForm from "../../../Frontend_Admin/Components/forms/DynamicForm";

const Home = () => {
  const editComponentObj = {
    carousel: false,
    briefIntro: false,
    projects: false,
    testmonial: false,
    serviceOffered: false,
    product_development: false,
    product_distribution: false,
  };

  const productComp = {
    product_development: "product_development",
    product_distribution: "product_distribution",
    product_registration: "product_registration",
  };

  const pageType = "home";
  const serviceOffered = "serviceOffered";
  const [testimonis, setTestmonis] = useState([]);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [news, setNews] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [homeCategoriesList, setHomeCategoriesList] = useState([]);
  const { categories } = useSelector((state) => state.categoryList);
  const { isLoading } = useSelector((state) => state.loader);

  const [productDevelopment, setProductDevelopment] = useState("");
  const [productDistribution, setProductDistribution] = useState("");
  const [productRegistration, setProductRegistration] = useState("");
  const dispatch = useDispatch();

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(value);
    document.body.style.overflow = "hidden";
  };

  const setResponseData = (data) => {
    if (data?.results.length > 0) {
      const _positionKey = getObjectPositionKey(data.results[0]);
      const _newslList = sortByFieldName(data.results, _positionKey);
      setNews(_newslList.slice(0, 4));
    } else {
      setNews([]);
    }
  };

  useEffect(() => {
    const getHomePageCategoryList = async () => {
      const ids = categories.map((item) => item.id);
      let categoryId = "";
      const arrURL = [];
      categories.forEach((item, index) => {
        arrURL.push(
          axiosClientServiceApi.get(`/products/getClinetProduct/${item.id}/`)
        );
      });

      await Promise.all(arrURL).then(function (values) {
        const result = genereateCategoryProducts(values, categories);
        setHomeCategoriesList(result);
      });
    };

    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
    if (categories.length > 0 && homeCategoriesList.length === 0) {
      getHomePageCategoryList();
    }
  }, [categories]);

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
        {/* CAROUSEL COMPONENT  */}
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

        {/* LEON Pharma Products  */}

        <ProductHilightsStyled>
          <div className="container position-relative d-none d-md-block">
            <div className="row text-white rounded-3 overflow-hidden position-absolute hiligntsContainer">
              <div className="col-sm-4 p-4 p-lg-5 py-lg-4 ">
                <div className="position-relative">
                  {isAdmin && hasPermission && (
                    <EditIcon
                      editHandler={() =>
                        editHandler(productComp.product_development, true)
                      }
                    />
                  )}

                  <SimpleTitleDescComponent
                    formgetURL={`/carousel/clientHomeIntro/${productComp.product_development}/`}
                    componentEdit={componentEdit.product_development}
                    setFormValues={setProductDevelopment}
                    formvalues={productDevelopment}
                  />
                  {componentEdit.product_development && (
                    <div className="adminEditTestmonial">
                      <DynamicForm
                        editHandler={editHandler}
                        componentType={productComp.product_development}
                        componentTitle="Product Development"
                        formPostURL={`/carousel/createHomeIntro/`}
                        formUpdateURL={`/carousel/updateHomeIntro/`}
                        editObject={productDevelopment}
                        dynamicFormFields={getTitleAndDescriptionFields(
                          productComp.product_development
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-4 p-4 p-lg-5 py-lg-4 ">
                <div className="position-relative">
                  {isAdmin && hasPermission && (
                    <EditIcon
                      editHandler={() =>
                        editHandler(productComp.product_distribution, true)
                      }
                    />
                  )}
                  <SimpleTitleDescComponent
                    formgetURL={`/carousel/clientHomeIntro/${productComp.product_distribution}/`}
                    componentEdit={componentEdit.product_distribution}
                    setFormValues={setProductDistribution}
                    formvalues={productDistribution}
                  />

                  {componentEdit.product_distribution && (
                    <div className="adminEditTestmonial">
                      <DynamicForm
                        editHandler={editHandler}
                        componentType={productComp.product_distribution}
                        componentTitle="Product Distribution"
                        formPostURL={`/carousel/createHomeIntro/`}
                        formUpdateURL={`/carousel/updateHomeIntro/`}
                        editObject={productDistribution}
                        dynamicFormFields={getTitleAndDescriptionFields(
                          productComp.product_distribution
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-4 p-4 p-lg-5 py-lg-4 ">
                <div className="position-relative">
                  {isAdmin && hasPermission && (
                    <EditIcon
                      editHandler={() =>
                        editHandler(productComp.product_registration, true)
                      }
                    />
                  )}
                  <SimpleTitleDescComponent
                    formgetURL={`/carousel/clientHomeIntro/${productComp.product_registration}/`}
                    componentEdit={componentEdit.product_registration}
                    setFormValues={setProductRegistration}
                    formvalues={productRegistration}
                  />

                  {componentEdit.product_registration && (
                    <div className="adminEditTestmonial">
                      <DynamicForm
                        editHandler={editHandler}
                        componentType={productComp.product_registration}
                        componentTitle="Product Distribution"
                        formPostURL={`/carousel/createHomeIntro/`}
                        formUpdateURL={`/carousel/updateHomeIntro/`}
                        editObject={productRegistration}
                        dynamicFormFields={getTitleAndDescriptionFields(
                          productComp.product_registration
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ProductHilightsStyled>

        <div className="container mt-0 mt-md-5 pt-md-5">
          <Title
            title="Product Categories"
            cssClass=""
            mainTitleClassess="fs-2 text-center my-5 my-md-5 pt-0 pt-md-5"
            subTitleClassess=""
          />
          <div className="row">
            {homeCategoriesList.map(
              (category) =>
                category?.products?.length > 0 && (
                  <>
                    <Product
                      item={category.products[0]}
                      categoryId={category.id}
                    />
                    {/* {category.category_name} */}
                  </>
                )
            )}
          </div>
        </div>

        {/* INTRODUCTION COMPONENT */}
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("briefIntro", true)} />
        )}
        <div className="container">
          <div className="row my-4">
            {/* <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              pageType="Home"
            /> */}

            <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              linkCss="btn btn-outline d-flex justify-content-center align-items-center gap-3"
              linkLabel="Read More"
              moreLink=""
              introTitleCss="fs-3 fw-medium text-md-center"
              introSubTitleCss="fw-medium text-muted text-md-center"
              introDecTitleCss="fs-6 fw-normal w-75 m-auto text-md-center"
              detailsContainerCss="col-md-10 offset-md-1 py-3"
              anchorContainer="d-flex justify-content-center align-items-center mt-4"
              anchersvgColor="#17427C"
              pageType={pageType}
            />
          </div>
        </div>

        {componentEdit.briefIntro && (
          <div className="adminEditTestmonial">
            <BriefIntroAdmin
              editHandler={editHandler}
              componentType="briefIntro"
              pageType="Home"
            />
          </div>
        )}

        {/* Random Hilights */}
        <ABriefIntroStyled>
          <div className="container-lg mx-0 mx-md-0 px-md-0 mx-lg-auto randomServices">
            <div className="row">
              <ABriefAbout
                col1="col-md-6 ps-sm-0"
                col2="col-md-6 p-4 p-md-5 d-flex justify-content-center align-items-start flex-column"
                cssClass="fs-3 fw-medium title"
                imageClass="w-100 object-fit-cover imgStylingLeft shadow"
                dimensions={imageDimensionsJson("whoweare")}
                pageType={"productPortfolio"}
                componentFlip={false}
              />
            </div>

            <div className="row d-flex flex-row-reverse my-3 my-md-5">
              <ABriefAbout
                col1="col-md-6 pe-sm-0"
                col2="col-md-6 p-4 p-md-5 d-flex justify-content-center align-items-start flex-column"
                cssClass="fs-3 fw-medium title"
                imageClass="w-100 object-fit-cover imgStylingRight shadow imgStyling"
                dimensions={imageDimensionsJson("whoweare")}
                pageType={"promoting"}
                componentFlip={false}
              />
            </div>
            <div className="row">
              <ABriefAbout
                col1="col-md-6 ps-sm-0"
                col2="col-md-6 p-4 p-md-5 d-flex justify-content-center align-items-start flex-column"
                cssClass="fs-3 fw-medium title"
                imageClass="w-100 object-fit-cover imgStylingLeft shadow"
                dimensions={imageDimensionsJson("whoweare")}
                pageType={"whatwedo"}
                componentFlip={false}
              />
            </div>
          </div>
        </ABriefIntroStyled>

       
        {/* TESTIMONIAL COMPONENT */}
        <TestimonialCarouselPageStyled>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Title
                  title="Testimonials"
                  cssClass=""
                  mainTitleClassess="fs-2 text-center fw-medium mb-5 pt-5"
                  subTitleClassess=""
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 p-5 testimonials text-center">
                {isAdmin && hasPermission && (
                  <EditIcon
                    editHandler={() => editHandler("testmonial", true)}
                  />
                )}

                {testimonis.length < 1 ? (
                  (testimonis.length, "No Testimonials Found")
                ) : testimonis.length === 1 ? (
                  <h4>Please add 2 or more testimonials.</h4>
                ) : testimonis.length > 1 ? (
                  <Testimonials testimonis={testimonis} />
                ) : (
                  ""
                )}
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
            </div>
          </div>
        </TestimonialCarouselPageStyled>

        {/* HOME News */}
        <div className="row py-5 homeNews">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="container">
              <Title
                title="News"
                cssClass=""
                mainTitleClassess="fs-2 text-center fw-medium mb-5 pt-5"
                subTitleClassess=""
              />
              <HomeNews
                news={news}
                setNews={setResponseData}
                pagetype={pageType}
              />

              <div className="d-flex justify-content-center align-items-center mt-4">
                <Ancher
                  AncherLabel="Read more"
                  Ancherpath="/news"
                  AncherClass="btn btn-outline d-flex justify-content-center align-items-center "
                  AnchersvgColor="#17427C"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

     

      {/* END OF HPR INFRA COMPONENTS */}

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
