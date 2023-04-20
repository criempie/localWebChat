import { HTMLAttributes } from 'react';

export interface IconProps extends HTMLAttributes<SVGElement> {
    width: number;
    height: number;

    color?: string;
}