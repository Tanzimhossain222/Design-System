import React from 'react';
import {FontSize} from '@ds.e/foundation'
import "@ds.e/scss/dist/Text.css";
interface TextProps {
size?: keyof typeof FontSize,
children: React.ReactNode
}

const Text: React.FC<TextProps> = ({size=FontSize.base,children}) => {
    const ClassName = `dse-text dse-text-${size}`
  return (
    <p className={ClassName}> {children} </p>
  )
}

export default Text