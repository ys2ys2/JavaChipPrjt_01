import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>펀딩할래!</Logo>
        <Links>
          <LinkItem href="#">About Us</LinkItem>
          <LinkItem href="#">Contact</LinkItem>
          <LinkItem href="#">Terms of Service</LinkItem>
          <LinkItem href="#">Privacy Policy</LinkItem>
        </Links>
        <SocialMedia>
          <SocialLink href="#">
            <i className="fab fa-facebook-f"></i>
          </SocialLink>
          <SocialLink href="#">
            <i className="fab fa-twitter"></i>
          </SocialLink>
          <SocialLink href="#">
            <i className="fab fa-instagram"></i>
          </SocialLink>
        </SocialMedia>
      </FooterContent>
      <Copyright>&copy; 2024 펀딩할래!. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 40px 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
`;

const LinkItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 15px;
  font-size: 20px;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    color: #1da1f2;
  }
`;

const Copyright = styled.p`
  margin-top: 20px;
  font-size: 12px;
  color: #bbb;
`;