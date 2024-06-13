import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { axiosServiceApi } from "../util/axiosUtil";
import { getBaseURL } from "../util/ulrUtil";
import useAdminLoginStatus from "./customhook/useAdminLoginStatus";

const CatageoryImgC = ({
  title,
  catategoryImgs,
  catategoryImgState,
  cssClass,
  project,
  category,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "clientInformation",
  ]);
  const navigate = useNavigate();
  const baseURL = getBaseURL();
  const { isAdmin } = useAdminLoginStatus();
  /**
   * get selected Images for edit
   */
  useEffect(() => {
    const getSelectedImages = async () => {
      const response = await axiosServiceApi.get(
        `/gallery/getSelectedImagesById/`,
        {
          params: {
            projectID: project.id,
            category: category,
          },
        }
      );
      if (response?.status === 200 && response?.data?.fileData?.length > 0) {
        catategoryImgState(response.data.fileData);
      }
    };
    if (project?.id) {
      getSelectedImages();
    }
  }, [project, category]);

  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(
        `/gallery/deleteGalleryImage/${id}/`
      );
      if (response.status === 204) {
        const list = catategoryImgs.filter((item) => item.id !== id);
        catategoryImgState(list);
      }
    };
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${name} image?`}
          />
        );
      },
    });
  };

  const downloadPDF = (url) => {
    if (isAdmin) {
      return true;
    }

    const navigateTocontactus = () => {
      removeCookie("previousPath");
      setCookie("previousPath", window.location.pathname);
      navigate(`/contact`);
    };

    if (cookies.clientInformation !== undefined) {
      window.open(
        url,
        "_blank",
        "location=yes,height=800,width=600 ,scrollbars=yes,status=yes"
      );
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <DeleteDialog
              title={"We need some your personal details to download PDF's"}
              onClose={onClose}
              callback={navigateTocontactus}
              label={"to Download PDF's"}
              buttonStyle={"btn-success"}
            />
          );
        },
      });
    }
  };

  return (
    <div className="">
      {catategoryImgs.length > 0 ? (
        <>
         
          <div className="d-flex justify-content-start align-items-center flex-wrap">
            {
              catategoryImgs.map((item) => {
                return item.contentType === ".pdf" ? (
                  <div className="categoryContainer" key={item.id}>
                    <li className="list-group-item d-flex justify-content-center align-items-between me-3">
                     
                      <a
                        href="#!"
                        onClick={() => downloadPDF(`${baseURL}${item.path}`)}
                        className="mx-1 text-dark"
                      >
                        {item.originalname}
                      </a>
                      <span
                        onClick={() => thumbDelete(item.id, item.originalname)}
                      >
                        <i
                          className="fa fa-trash-o fs-4 text-danger"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </li>
                  </div>
                ) : (
                  <div
                    className="categoryContainer"
                    key={item.id}
                    onClick={() => thumbDelete(item.id, item.originalname)}
                  >
                    <img
                      className={cssClass}
                      src={`${baseURL}${item.path}`}
                      alt=" "
                    />
                  </div>
                );
              })

              // : <p className='text-warning fs-4 text-center my-5'>Gallery is empty!, please add images.</p>
            }
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CatageoryImgC;
