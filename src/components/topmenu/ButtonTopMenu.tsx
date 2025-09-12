'use client';

import CustomButton from "../buttons/CustomButton";

interface Props {
    text: string;
    link: string;
    icon?: React.ReactNode;
}

export default function ButtonTopMenu({ text, link, icon }: Props) {
    return (
        <CustomButton
            link={link}
            text={text}
            icon={icon}
            textColor="text-primary-950 dark:text-white"
            color="bg-primary-100 dark:bg-primary-600"
            hover="hover:bg-primary-200 dark:hover:bg-primary-700"
            className="rounded-lg"
        />
    );
}