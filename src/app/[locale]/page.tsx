import GitHubIcon from "@/components/icons/IconGitHub";
import LinkedInIcon from "@/components/icons/IconLinkedIn";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Text } from "./typography/Text";

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div>
      <Section content={
        <div className="flex gap-44 justify-center mt-10">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-9xl font-black">YAIR ACUÑA</h1>
            <div className="text-6xl text-primary-700 dark:text-primary-200">{t('What I am')}</div>
            <div className="flex gap-10 justify-center mt-5">
              <a href={"https://github.com/YairAcuna3"} target="_blank" rel="noopener noreferrer">
                <GitHubIcon size={40} darkColor="white" lightColor="var(--color-primary-950)" />
              </a>
              <a href={"https://www.linkedin.com/in/yair-acuña-mendoza-602593341"} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon size={40} darkColor="white" lightColor="var(--color-primary-950)" />
              </a>
            </div>
          </div>
          <Image
            src="/imgs/1pensativo.jpg"
            alt="Foto mía"
            width={400}
            height={400}
          />
        </div>
      }
        className="px-5"
      />

      <Section content={
        <div className="flex items-center my-10">
          <div className="w-5 h-5 bg-primary-950 dark:bg-white rounded-full"></div>
          <div className="flex-1 border-b-4"></div>
        </div>
      } />

      <Section content={
        <div>
          <Text segments={[
            { text: t('Feature 1'), color: "text-primary-700 dark:text-primary-200", size: "3xl", breakAfter: true },
            { text: t('Feature 1 desc') }
          ]} fontSize="2xl" className="mb-8 w-2/5" />

          <Text segments={[
            { text: t('Feature 2'), color: "text-primary-700 dark:text-primary-200", size: "3xl", breakAfter: true },
            { text: t('Feature 2 desc') }
          ]} fontSize="2xl" className="mb-8 w-2/5 ml-auto" />

          <Text segments={[
            { text: t('Feature 3'), color: "text-primary-700 dark:text-primary-200", size: "3xl", breakAfter: true },
            { text: t('Feature 3 desc') }
          ]} fontSize="2xl" className="mb-8 w-2/5" />

          <Text segments={[
            { text: t('Feature 4'), color: "text-primary-700 dark:text-primary-200", size: "3xl", breakAfter: true },
            { text: t('Feature 4 desc') }
          ]} fontSize="2xl" className="mb-18 w-2/5 ml-auto" />
        </div>
      }
        className=""
      />
    </div>
  );
}
