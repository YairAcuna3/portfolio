import EmailIcon from "./icons/IconEmail";
import GitHubIcon from "./icons/IconGitHub";
import LinkedInIcon from "./icons/IconLinkedIn";
import YairAcunaIcon from "./icons/IconYairAcuna";

export default function Footer() {
    return (
        <footer className="flex justify-between py-6 md:py-8 px-4 md:px-20 bg-primary-700 dark:bg-gray-800 text-white border-t-1 border-t-primary-300">
            <div className="flex gap-5 items-center">
                <YairAcunaIcon
                    size={40}
                    darkColor="white"
                    lightColor="var(--color-primary-100)"
                />
                <div className="flex flex-col sm:flex-row">
                    <p className="text-primary-100 dark:text-white mr-2">
                        © {new Date().getFullYear()}
                    </p>
                    <p>
                        Yair Acuña.
                    </p>
                </div>
            </div>
            <div className="flex gap-5">
                <GitHubIcon
                    href="https://github.com/YairAcuna3" target="_blank"
                    size={40}
                    darkColor="white"
                    lightColor="var(--color-primary-100)"
                />
                <LinkedInIcon
                    href="https://www.linkedin.com/in/yair-acuña-mendoza-602593341" target="_blank"
                    size={40}
                    darkColor="white"
                    lightColor="var(--color-primary-100)"
                />
                <EmailIcon
                    href={"/contact"}
                    size={40}
                    darkColor="white"
                    lightColor="var(--color-primary-100)"
                />
            </div>
        </footer>
    );
}