/**
 * <path d="M13.5 3H12H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H7.5M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V9.75V12V19C19 20.1046 18.1046 21 17 21H16.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 * <path d="M12 21L12 13M12 13L14.5 15.5M12 13L9.5 15.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 */

import { IconProps } from '../types';

interface Props extends IconProps {}

function Upload(props: Props) {
    return (
        <svg
            { ...props }
            xmlns="http://www.w3.org/2000/svg"
            width={ props.width }
            height={ props.height }
            viewBox="0 0 24 24"
        >
            <path
                d="M13.5 3H12H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H7.5M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V9.75V12V19C19 20.1046 18.1046 21 17 21H16.5"
                stroke={ props.color ?? '#000' }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />

            <path d="M12 21L12 13M12 13L14.5 15.5M12 13L9.5 15.5"
                  stroke={ props.color ?? '#000' }
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round" />
        </svg>
    );
}

export { Upload };
