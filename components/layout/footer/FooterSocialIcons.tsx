import { Box, IconButton } from "@mui/material";
import socialLinks from "lib/data/socials.json";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";

// Map social names to MUI icons or fallback to react-icons
const iconMap: Record<string, JSX.Element> = {
  Facebook: <FaFacebookF />,
  Instagram: <FaInstagram />,
  TikTok: <FaTiktok />
};

export default function FooterSocialIcons({ sizeInRem = 1.2 }: { sizeInRem?: number }) {
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
