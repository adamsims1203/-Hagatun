import React from 'react'
import styled, { css } from 'styled-components'

import CompanyLogo from '../static/favicon.svg'

import './skin.css?raw'

const Logo = ({ projectName }) => {
  return (
    <Icon isLogin={projectName}>
      <img src={CompanyLogo} />
    </Icon>
  )
}

const Icon = styled.div`
  display: block;
  width: auto;
  height: 2em;
  max-width: 100%;
  margin: -0.75rem auto;
  color: white;

  ${props =>
    props.isLogin &&
    css`
      display: block;
      margin: 0 auto;
      height: 4rem;
      color: black;
    `}

  svg, img {
    display: block;
    margin: 0 auto;
    height: 100% !important;
    width: auto;
    fill: currentColor;
  }
`

export default Logo
