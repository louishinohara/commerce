import socialLinks from "lib/data/socials.json";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";

// Explicitly define the type of iconMap
const iconMap: Record<string, JSX.Element> = {
  FaFacebookF: <FaFacebookF />,
  FaInstagram: <FaInstagram />,
  FaTiktok: <FaTiktok />,
};

export default function FooterSocialIcons() {
  return (
    <div className="flex flex-row items-center gap-4">
      {socialLinks.map((social, i) => (
        <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
          {iconMap[social.icon as keyof typeof iconMap] || null}
        </a>
      ))}
    </div>
  );
}
