import React from 'react'
import './styles.scss';

export default function PageTitle({ text }) {
  return (
    <div className="div__page-title">
        <h1>{text}</h1>
    </div>
  )
}
