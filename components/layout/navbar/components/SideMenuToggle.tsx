import { Box, IconButton } from "@mui/material";
import LogoSquare from "components/logo-square";
import Link from "next/link";

export default function SideMenuToggle({ 
    isMobile, 
    cartOpen,
    menuOpen,
    toggleMenu
}: { 
    isMobile: boolean; 
    menuOpen: boolean;
    cartOpen: boolean;
    toggleMenu: () => void; 
}) {
    return (
        <>
            {isMobile ? (
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleMenu} // Calls toggleMenu directly
                    sx={{
                        width: 30,
                        height: 30,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        margin: 0,
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": { transform: "scale(1.05)" },
                    }}
                >
                    <Box
                        id="nav-icon1"
                        className={menuOpen || cartOpen ? "open" : ""}
                        sx={{
                            width: "18px", 
                            height: "12px",
                            position: "relative",
                            transition: "0.5s ease-in-out",
                            "& span": {
                                display: "block",
                                position: "absolute",
                                height: "2px", 
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "2px",
                                opacity: 1,
                                transition: "0.25s ease-in-out",
                            },
                            "& span:nth-of-type(1)": {
                                top: 0,
                                transform: menuOpen || cartOpen ? "translateY(6px) rotate(45deg)" : "none",
                            },
                            "& span:nth-of-type(2)": {
                                top: "6px",
                                opacity: menuOpen || cartOpen ? 0 : 1, // Hide middle span
                                transform: menuOpen || cartOpen ? "translateX(-24px)" : "none",
                            },
                            "& span:nth-of-type(3)": {
                                top: "12px",
                                transform: menuOpen || cartOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                            },
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </Box>
                </IconButton>
            ) : (
                <Link href="/" prefetch={true} style={{ display: "flex", alignItems: "center" }} scroll={false}>
                    <LogoSquare />
                </Link>
            )}
        </>
    );
}
