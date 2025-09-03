import EmailIcon from "./icons/IconEmail";
import GitHubIcon from "./icons/IconGitHub";
import LinkedInIcon from "./icons/IconLinkedIn";
import YairAcunaIcon from "./icons/IconYairAcuna";

export default function Footer() {
    return (
        <footer className="flex justify-between py-8 px-20 bg-primary-700 dark:bg-primary-950 text-white">
            <div className="flex gap-5 items-center">
                <YairAcunaIcon size={40} darkColor="white" lightColor="var(--color-primary-100)" className="ml-10" />
                <p className="text-primary-100 dark:text-white">
                    © {new Date().getFullYear()} Yair Acuña.
                </p>
            </div>
            <div className="flex gap-5">
                <a href={"https://github.com/YairAcuna3"} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon size={40} darkColor="white" lightColor="var(--color-primary-100)" />
                </a>
                <a href={"https://www.linkedin.com/in/yair-acuña-mendoza-602593341"} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon size={40} darkColor="white" lightColor="var(--color-primary-100)" />
                </a>
                <a href={"https://www.linkedin.com/in/yair-acuña-mendoza-602593341"} target="_blank" rel="noopener noreferrer">
                    <EmailIcon size={40} darkColor="white" lightColor="var(--color-primary-100)" />
                </a>
            </div>
        </footer>
    );
}