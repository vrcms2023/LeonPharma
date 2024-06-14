import styled from "styled-components";

export const ContactPageStyled = styled.div`
background: ${({theme}) => theme.primaryColor};
  .contactPage {
    
    .contactAddress {
      color: ${({ theme }) => theme.black};
  
      i {
        color: ${({ theme }) => theme.secondaryColor};
      }
    }
    
    .quickContact {
      background: ${({ theme }) => theme.primaryColor};

      .formTitle {
        color: ${({ theme }) => theme.secondaryColor};
      }
    }
  }
`;
