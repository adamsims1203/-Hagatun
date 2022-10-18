import React from 'react'
import cx from 'classnames'
import { getIcon } from '../schemas/objects/social-link'

export const Header1 = props => (
  <h1
    style={{
      margin: '0',
      fontSize: '2rem',
      lineHeight: '1.5',
      fontWeight: 400
    }}
  >
    {props.children}
  </h1>
)

export const Header2 = props => (
  <h2
    style={{
      margin: '0',
      fontSize: '1.75rem',
      lineHeight: '1.375',
      fontWeight: 400
    }}
  >
    {props.children}
  </h2>
)

export const Header3 = props => (
  <h3
    style={{
      margin: '0',
      fontSize: '1.5rem',
      lineHeight: '1.25',
      fontWeight: 400
    }}
  >
    {props.children}
  </h3>
)

export const Header4 = props => (
  <h4
    style={{
      margin: '0',
      fontSize: '1.25rem',
      lineHeight: '1.25',
      fontWeight: 400
    }}
  >
    {props.children}
  </h4>
)

export const Button = ({ isButton, styles, children, ...props }) => {
  if (!isButton) return children

  return (
    <span
      className={cx('btn', styles?.style, {
        'is-large': styles?.isLarge,
        'is-block': styles?.isBlock
      })}
    >
      {children}
    </span>
  )
}

export const Icon = ({ styles, children, ...props }) => {
	if(props._type !== 'socialMedia') return children
	const { Icon: Comp, color } = getIcon(props.link.icon)
	
  return (
		<>
			<Comp size="inherit" color={color} />
			{children}
		</>
	)
}
