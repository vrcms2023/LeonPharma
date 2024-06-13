import React from "react";

const Title = ({ 
  title = "",
  subTitle = "", 
  cssClass,
  mainTitleClassess="",
  subTitleClassess=""
 }) => {
  return (
    <>
      <div className={`${cssClass} ${mainTitleClassess}`}>
        {title}
        {subTitle ? (
          <span className={`${subTitleClassess}`}>{subTitle}</span>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Title;
