import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

const HEIGHT = 80

const NavbarView = styled.nav`
  position: fixed;
  top: ${p => (p.visible ? '0' : '-80px')};
  width: 100%;
  height: ${HEIGHT}px;
  background-color: ${p => p.theme.navBGColor};
  box-shadow: ${p => (p.visible ? '0px 5px 10px 2px rgba(0,0,0,0.1)' : 'none')};
  z-index: 10;
  transition: all 0.4s ease 0s;

  @media only screen and (max-width: 700px) {
    height: 60px;
  }
`

const Content = styled.div`
  height: 100%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::before {
    content: '';
    min-width: 50px;
  }
  &::after {
    content: '';
    min-width: 50px;
  }

  @media only screen and (max-width: 700px) {
    &::before {
      content: '';
      min-width: 20px;
    }
    &::after {
      content: '';
      min-width: 20px;
    }
  }
`

const Title = styled.p`
  font-size: min(3vw, 35px);
  font-weight: 600;
  color: ${p => p.theme.navTextColor};
  flex: 2;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`

const Item = styled.a`
  font-size: min(max(2.4vw, 15px), 22px);
  font-weight: 500;
  color: ${p => p.theme.navTextColor};
  text-align: center;
  text-decoration: none;
  padding: 10px;
  flex: 1;

  @media only screen and (max-width: 390px) {
    padding: 0px;
  }
`

export default function Navbar({ title, items }) {
  const [prevPos, setPrevPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = useCallback(() => {
    const currPos = window.pageYOffset
    setVisible(currPos < HEIGHT || prevPos > currPos)
    setPrevPos(currPos)
  }, [prevPos])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevPos, visible, handleScroll])

  return (
    <NavbarView visible={visible}>
      <Content>
        <Title>{title}</Title>
        {items.map(({ id, title }) => (
          <Item key={id} href={`#${id}`}>
            {title}
          </Item>
        ))}
      </Content>
    </NavbarView>
  )
}
