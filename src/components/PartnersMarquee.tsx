import Marquee from "react-fast-marquee";

const companyLogos = [
  { name: "JumboTreats",  src: new URL("../assets/companyLogo/JumboTreats.png",   import.meta.url).href },
  { name: "BuksSkills",   src: new URL("../assets/companyLogo/BuksSkills.png",    import.meta.url).href },
  { name: "Ocean21",      src: new URL("../assets/companyLogo/Ocean21.png",       import.meta.url).href },
  { name: "Auitria",      src: new URL("../assets/companyLogo/Auitira.png",       import.meta.url).href },
  { name: "Kingress",     src: new URL("../assets/companyLogo/Kingress.png",      import.meta.url).href },
  { name: "Cavedwellers", src: new URL("../assets/companyLogo/cavedwellers.png",  import.meta.url).href },
  { name: "Sytt",         src: new URL("../assets/companyLogo/sytt.png",          import.meta.url).href },
];

const PartnersMarquee = () => (
  <div className="py-10 border-y border-border/40">
    <div className="container mx-auto px-6 mb-6 text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
        Trusted by leading brands
      </p>
    </div>
    <Marquee speed={35} gradient gradientColor="black" gradientWidth={80}>
      {companyLogos.map((logo) => (
        <div key={logo.name} className="mx-8">
          <img
            src={logo.src}
            alt={logo.name}
            width={100}
            height={50}
            className="object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      ))}
    </Marquee>
  </div>
);

export default PartnersMarquee;
