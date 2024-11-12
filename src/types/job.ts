export interface JobFrontmatter {
  position: string;
  description: string;
  location: string;
  team: string;
  datePosted: string;
  validThrough: string;
  employmentType: string;
  hiringOrganization: {
    name: string;
    sameAs: string;
    logo: string;
  };
  jobLocation: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  baseSalary: {
    currency: string;
    value: number;
    minValue: number;
    maxValue: number;
    unitText: string;
  };
  experienceRequirements: string;
  occupationalCategory: string[];
  identifier: {
    name: string;
    value: string;
  };
  featured: boolean;
  remote: boolean;
  email: string[];
} 