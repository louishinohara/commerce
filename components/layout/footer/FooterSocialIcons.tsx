import { Box, IconButton } from "@mui/material";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import socialLinks from "../../../lib/data/socials/data.json"; // ✅ Updated import

// Map social names to MUI icons
const iconMap: Record<string, JSX.Element> = {
  Facebook: <FaFacebookF />,
  Instagram: <FaInstagram />,
  TikTok: <FaTiktok />
};

// Define the interface for TypeScript
interface SocialLink {
  name: string;
  url: string;
}

export default function FooterSocialIcons({ sizeInRem = 1.2 }: { sizeInRem?: number }) {
  if (!socialLinks || socialLinks.length === 0) return null; // Prevent rendering empty component

  return (
    <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
      {socialLinks.map((social, i) => {
        const IconComponent = iconMap[social.name];

        return (
          <IconButton
            key={i}
            component="a"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            sx={{ color: "inherit", fontSize: `${sizeInRem}rem`, padding: "4px" }}
          >
            {IconComponent && <Box sx={{ fontSize: `${sizeInRem}rem` }}>{IconComponent}</Box>}
          </IconButton>
        );
      })}
    </Box>
  );
}
