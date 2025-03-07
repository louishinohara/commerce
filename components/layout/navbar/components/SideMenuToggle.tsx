import { Box, IconButton } from "@mui/material";
import LogoSquare from "components/logo-square";
import Link from "next/link";

export default function SideMenuToggle({ 
    isMobile, 
    setMenuOpen, 
    menuOpen 
}: { 
    isMobile: boolean; 
    setMenuOpen: (open: boolean) => void; 
    menuOpen: boolean;
}) {
    return (
        <>
            {isMobile ? (
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                    sx={{
                        width: 30,
                        height: 30,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": { transform: "scale(1.05)" },
                    }}
                >
                    <Box
                        id="nav-icon1"
                        className={menuOpen ? "open" : ""}
                        sx={{
                            width: "18px",  // ✅ Smaller width
                            height: "12px", // ✅ Adjusted height for proportional scaling
                            position: "relative",
                            transition: "0.5s ease-in-out",
                            "& span": {
                                display: "block",
                                position: "absolute",
                                height: "2px", // ✅ Thinner lines
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "2px",
                                opacity: 1,
                                transition: "0.25s ease-in-out",
                            },
                            "& span:nth-of-type(1)": {
                                top: 0,
                                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
                            },
                            "& span:nth-of-type(2)": {
                                top: "6px", // ✅ Less spacing
                                opacity: menuOpen ? 0 : 1,
                                transform: menuOpen ? "translateX(-24px)" : "none",
                            },
                            "& span:nth-of-type(3)": {
                                top: "12px", // ✅ Adjusted for smaller size
                                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                            },
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </Box>
                </IconButton>
            ) : (
                <Link href="/" prefetch={true} style={{ display: "flex", alignItems: "center" }}>
                    <LogoSquare />
                </Link>
            )}
        </>
    );
}
