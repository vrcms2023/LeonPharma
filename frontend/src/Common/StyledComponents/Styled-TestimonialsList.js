import styled from "styled-components";

export const TestimonialsListPageStyled = styled.div`

  .testimonialsPage  {
    background: ${({theme}) => theme.primaryColor}
  }
  .testimonialsPage hr:last-child {
    display: none;
  }
  .testimonialAvatar img {
    max-width: 150px;
    max-height: 150px;
  }
`;
