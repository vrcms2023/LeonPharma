import styled from "styled-components";

export const NewsStyled = styled.div`
  .card {
    min-height: 380px;
    background-color: ${({ theme }) => theme.newsCardBg};
    color: ${({ theme }) => theme.newsCardTextColor};
    margin-bottom: 30px;
    border-radius: 10px;
    overflow: hidden;
    border: 0px;
    transition: opacity 0.5s ease, transform 0.5s ease, border-radius 0.5s ease;

    &:hover {
      transform: scale(1.1) rotate(-0deg);
    }


    .title {
      color: ${({ theme }) => theme.newsCardTitleColor};
    }

    img {
      height: 200px;
      width: 100%;
      object-fit: cover;
      object-position: bottom;
    }

    .card-body {
      // a {
      //     color:${({ theme }) => theme.primaryColor} !important;

      //     &:hover {
      //         color:${({ theme }) => theme.secondaryColor} !important;
      //     }
      // }
    }
    
  }
  .adminView {
    img {
      width: 80px !important;
      height: 80px;
    }

    
  }
`;
