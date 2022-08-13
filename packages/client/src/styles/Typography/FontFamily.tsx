import React from 'react'
import { Helmet } from 'react-helmet-async'

const Inter = `Inter:wght@100;300;400;500;600;700`
const FiraSans = `Fira+Sans:ital,wght@0,400;0,500;1,400`
const FiraCode = `Fira+Code:wght@500`

export const FontFamilyBase = `
	font-family: Inter, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
	font-style: normal;
`

export const FontFamilyCode = `
	font-family: 'Fira Sans', sans-serif;
	font-style: normal;
`

export const FontFamilyCode2 = `
	font-family: 'Fira Code', monospace !important;
`

/**
 * @todo preload link
 */
export function FontFamily() {
  return (
    <Helmet>
      <link
        href={`https://fonts.googleapis.com/css2?family=${Inter}&family=${FiraSans}&family=${FiraCode}&display=swap`}
        rel="stylesheet"
      />
    </Helmet>
  )
}
