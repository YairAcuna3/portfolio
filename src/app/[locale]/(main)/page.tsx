"use client"

import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Text } from "@/components/typography/Text";
import { useEffect, useState } from "react";
import { ShowProject } from "@/types/project";
import { getLastProject } from "@/actions/project/getLastProject";
import SeparatorLine from "@/components/SeparatorLine";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import ShowLastProject from "@/components/main/ShowLastProject";
import ProyectsCount from "@/components/main/ProyectsCount";

export default function Home() {
  const [lastProject, setLastProject] = useState<ShowProject | null>();
  const t = useTranslations('Home');

  useEffect(() => {
    const fetchLastProject = async () => {
      const data = await getLastProject();
      if (data) {
        setLastProject(data);
      }
      //TODO: To test when there aren't projects
      // setLastProject(null);
    };
    fetchLastProject();
  }, [])

  return (
    <div className="pt-4 max-w-full">
      <Section content={
        <div className="flex gap-44 justify-center mt-10">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-9xl font-black">YAIR ACUÑA</h1>
            <div className="text-6xl text-primary-700 dark:text-primary-200">{t('What I am')}</div>
            <div className="flex gap-10 justify-center mt-5 items-center">
              <GitHubIcon
                size={40}
                darkColor="white"
                lightColor="var(--color-primary-950)"
                href="https://github.com/YairAcuna3"
                target="_blank"
              />
              <LinkedInIcon
                size={40}
                darkColor="white"
                lightColor="var(--color-primary-950)"
                href="https://www.linkedin.com/in/yair-acuña-mendoza-602593341"
                target="_blank"
              />
            </div>
          </div>
          <Image
            src="/imgs/1pensativo.jpg"
            alt="Foto mía"
            width={400}
            height={400}
            className="rounded-2xl"
          />
        </div>
      }
        className="px-5"
      />

      <SeparatorLine className={"my-10"} />

      <div className="flex justify-between mx-32 p-4">
        <Text segments={[
          { text: t('Feature 1'), color: "text-primary-700 dark:text-primary-200", size: "3xl", breakAfter: true },
          { text: t('Feature 1 desc') }
        ]} fontSize="2xl" className="mb-8 w-2/6" />
        <div className="mb-8 w-3/5 ml-6">
          <ShowLastProject project={lastProject} />
        </div>
      </div>
      <div className="flex justify-between mx-32 p-4">
        <div className="w-3/5 ml-6">
          <ProyectsCount />
        </div>
        <Text segments={[
          { text: t('Feature 4'), color: "text-primary-700 dark:text-primary-200", size: "3xl", breakAfter: true },
          { text: t('Feature 4 desc') }
        ]} fontSize="2xl" className="mb-10 w-2/6 ml-auto" />
      </div>

      <SeparatorLine className={"my-10, flex-row-reverse"} />

      <div className="flex flex-col justify-between mx-32 p-4">
        <Text segments={[
          { text: t('Feature 3'), color: "text-primary-700 dark:text-primary-200", size: "3xl", breakAfter: true },
          { text: t('Feature 3 desc') }
        ]} fontSize="2xl" className="mb-8 w-2/6" />
        <Text segments={[
          { text: t('Feature 2'), color: "text-primary-700 dark:text-primary-200", size: "3xl", breakAfter: true },
          { text: t('Feature 2 desc') }
        ]} fontSize="2xl" className="mb-8 w-2/6 ml-auto" />
      </div>

    </div>
  );
}
