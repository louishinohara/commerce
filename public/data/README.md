# JSON Structure Guide

## Overview
This document explains how the JSON structure is organized for managing the navigation menu, footer menu, and other structured content in the project. The JSON files are stored in the `public/data` directory.

## Directory Structure
```plaintext
public/data/
  ├── footer/
  │   └── data.json
  ├── landingPage/
  │   └── data.json
  ├── faq/
  │   └── data.json
```

---

## `menu/data.json`
This file defines the navigation structure for both the **primary menu**, **secondary menu**, and the **footer menu**.

### **Structure**
```json
{
  "pages": {
    "home": { "title": "Home", "path": "/", "isMobile": false },
    "newArrivals": { "title": "New Arrivals", "path": "/new-arrivals", "isMobile": false },
    "lighting": { "title": "Lighting", "path": "/lighting", "isMobile": true },
    "diffusers": { "title": "Diffusers", "path": "/diffusers", "isMobile": true },
    "about": { "title": "About Us", "path": "/about", "isMobile": true },
    "contact": { "title": "Contact Us", "path": "/contact", "isMobile": true },
    "trackOrder": { "title": "Track Order", "path": "/track-your-order", "isMobile": true },
    "ourVision": { "title": "Our Vision", "path": "/our-vision", "displayOnMobileMenu": true },
    "faq": { "title": "FAQ", "path": "/faq", "displayOnMobileMenu": false },
    "contactInfo": { "title": "Contact Us", "path": "/contact-information", "displayOnMobileMenu": true },
    "privacyPolicy": { "title": "Privacy Policy", "path": "/policies/privacy-policy", "displayOnMobileMenu": true },
    "termsOfService": { "title": "Terms of Service", "path": "/policies/terms-of-service", "displayOnMobileMenu": true },
    "refundPolicy": { "title": "Refund Policy", "path": "/policies/refund-policy", "displayOnMobileMenu": true }
  },
  "primaryMenu": ["home", "newArrivals", "lighting", "diffusers"],
  "secondaryMenu": ["about", "contact", "trackOrder"],
  "footerMenu": [
    {
      "title": "About Us",
      "menu": ["ourVision"]
    },
    {
      "title": "Policies",
      "menu": ["privacyPolicy", "termsOfService", "refundPolicy"]
    },
    {
      "title": "Help Center",
      "menu": ["faq", "contactInfo", "trackOrder"]
    }
  ]
}
```

### **Explanation**
- **`pages`**: A dictionary mapping page identifiers to their corresponding title, path, and mobile visibility.
- **`primaryMenu`**: An array of page identifiers that belong to the primary navigation menu.
- **`secondaryMenu`**: An array of page identifiers for the secondary navigation menu.
- **`footerMenu`**: An array of section objects containing a title and a list of pages belonging to that section.

---

## **Fetching the JSON Data in React**
To load and use this JSON data dynamically in React components, use `useEffect` and `useState`:
```tsx
import { useEffect, useState } from "react";

export default function useNavData() {
  const [navData, setNavData] = useState(null);

  useEffect(() => {
    fetch("/data/menu/data.json")
      .then((res) => res.json())
      .then((data) => {
        setNavData(data);
      })
      .catch((error) => console.error("Error fetching navigation data:", error));
  }, []);

  return navData;
}
```
This hook can be used inside components to access navigation data dynamically.

---

## **Updating the JSON**
Whenever a new page is added:
1. Add an entry inside `pages`.
2. If it belongs to a navigation section, add its identifier to `primaryMenu`, `secondaryMenu`, or `footerMenu`.
3. Ensure `displayOnMobileMenu` is set correctly if it should appear in the mobile menu.

By following this structure, navigation remains dynamic and easily maintainable. 🚀
