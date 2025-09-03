import React from 'react';

type TextSegment = {
    text: string;
    color?: string;
    breakAfter?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl';
};

interface TextProps {
    text?: string;
    segments?: TextSegment[];
    className?: string;
    fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl';
    color?: string;
    fontWeight?: 'light' | 'normal' | 'medium' | 'bold';
    h1Class?: string;
}

export const Text = ({
    text,
    segments,
    className = '',
    fontSize = '4xl',
    color = "!text-cb-800 dark:!text-cb-100",
    fontWeight = 'bold',
    h1Class = '',
}: TextProps) => {
    const fontSizeClasses = {
        'sm': 'text-sm',
        'md': 'text-md',
        'lg': 'text-lg',
        'xl': 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl sm:text-4xl md:text-5xl',
        '4xl': 'text-4xl sm:text-5xl md:text-6xl',
        '5xl': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
        '6xl': 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
        '7xl': 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl',
        '8xl': 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl'
    };

    const weightClass = {
        'light': '!font-light',
        'normal': 'font-normal',
        'medium': 'font-medium',
        'bold': 'font-bold'
    }[fontWeight];

    const renderContent = () => {
        if (segments && segments.length > 0) {
            return segments.map((segment, index) => (
                <React.Fragment key={index}>
                    <span className={`${segment.color || color} ${fontSizeClasses[segment.size || fontSize]}`}>
                        {segment.text}
                    </span>
                    {index < segments.length - 1 && !segment.breakAfter && ' '}
                    {segment.breakAfter && <br />}
                </React.Fragment>
            ));
        } else {
            return <span className={color}>{text}</span>;
        }
    };

    return (
        <div className={`${className}`}>
            <h1
                className={`
          ${fontWeight === 'bold'}
          antialiased 
          ${fontSizeClasses[fontSize]}
          ${weightClass}
          break-words
          hyphens-auto
          leading-tight
          tracking-tight
          ${h1Class}
        `}
            >
                {renderContent()}
            </h1>
        </div>
    );
};