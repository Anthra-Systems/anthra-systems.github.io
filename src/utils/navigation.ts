// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "Products", url: "#" },
  { name: "Services", url: "#" },
  { name: "Blog", url: "#" },
  { name: "Contact", url: "/contact" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "Innovation",
    links: [
      { name: "R&D Pipeline", url: "#" },
      { name: "Engineering Services", url: "#" },
      { name: "Technical Docs", url: "#" },
    ],
  },
  {
    section: "Company",
    links: [
      { name: "About Anthra", url: "#" },
      { name: "Blog", url: "#" },
      { name: "Careers", url: "#" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  facebook: "#", // Set to "#" to hide or ignore
  x: "#", 
  github: "#",
  google: "#",
  slack: "#",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};