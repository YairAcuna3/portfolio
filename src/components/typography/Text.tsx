import React from 'react';

type TextSegment = {
    text: string;
    color?: string;
    breakAfter?: boolean;
    size?: string;
};

interface TextProps {
    text?: string;
    segments?: TextSegment[];
    className?: string;
    fontSize?: string;
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
                    <span className={`${segment.color || color} ${segment.size || fontSize}`}>
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
          ${fontSize}
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