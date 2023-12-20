import React from 'react'
import {Spacing} from '@ds.e/foundation';
import '@ds.e/scss/dist/Margin.css';

interface MarginProps {
    space?: keyof typeof Spacing;
    children: React.ReactNode;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;

};

const Margin: React.FC<MarginProps> = ({space='md',children,left,right,top,bottom}) => {
    let classNames =``;

    if(!left && !right && !top && !bottom){
        classNames = `dse-margin-${space}`;
    } if (left){
        classNames += `dse-margin-left-${space} `;
    } if (right){
        classNames += `dse-margin-right-${space} `;
    } if (top){
        classNames += `dse-margin-top-${space} `;
    } if (bottom){
        classNames += `dse-margin-bottom-${space} `;
    }
  return (
    <div className={classNames}>
        {children}
    </div>
  )
}

export default Margin