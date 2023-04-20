import { IconProps } from '../types';

interface Props extends IconProps {}

function Cross(props: Props) {
    return (
        <svg
            { ...props }
            xmlns="http://www.w3.org/2000/svg"
            width={ props.width }
            height={ props.height }
            viewBox="0 0 24 24"
        >
            <path d="M16 8L8 16M8.00001 8L16 16"
                  stroke={props.color ?? '#000'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round" />
        </svg>
    )
}

export { Cross };
