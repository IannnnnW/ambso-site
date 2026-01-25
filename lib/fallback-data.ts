/**
 * Fallback data for when Sanity CMS is unavailable
 * This ensures the site remains functional even if the CMS is down
 */

import type {
  SiteSettings,
  HomepageContent,
  AboutPageContent,
  ContactPageContent,
  TeamPageContent,
  ResourcesPageContent,
} from './sanity.types';

export const fallbackSiteSettings: SiteSettings = {
  _id: 'fallback-site-settings',
  _type: 'siteSettings',
  siteName: 'AMBSO',
  siteDescription: 'Africa Medical and Behavioural Sciences Organization - Transforming Africa through innovative research, training and service provision',
  contactEmail: 'info@ambso.org',
  contactPhone: '(+256) 394 500 421',
  address: 'Masaka, Uganda',
  socialMedia: {
    facebook: 'https://facebook.com/ambso',
    twitter: 'https://twitter.com/ambso',
    linkedin: 'https://linkedin.com/company/ambso',
  },
  workingHours: {
    weekdays: 'Monday - Friday: 8:00 AM - 5:00 PM',
    weekends: 'Saturday - Sunday: Closed',
  },
};

export const fallbackHomepageContent: HomepageContent = {
  _id: 'fallback-homepage',
  _type: 'homepageContent',
  missionSection: {
    mission: {
      title: 'Our Mission',
      description: 'Transforming Africa through innovative research, training and service provision',
    },
    vision: {
      title: 'Our Vision',
      description: 'Complete Physical, Social and Mental well-being in Africa',
    },
    values: {
      title: 'Our Values',
      description: 'Integrity, Respect for diversity, Innovativeness, and Efficiency',
    },
  },
  programsSection: {
    title: 'Our Programs',
    subtitle: 'We deliver comprehensive health solutions through four strategic pillars',
    programs: [
      {
        title: 'Clinical Programs',
        description: 'Providing quality healthcare services through clinical trials and medical interventions',
        icon: 'Microscope',
        href: '/programs/clinical',
        colorClass: 'bg-blue-100 text-blue-600',
      },
      {
        title: 'Community Programs',
        description: 'Empowering communities with health education and preventive care initiatives',
        icon: 'Users',
        href: '/programs/community',
        colorClass: 'bg-green-100 text-green-600',
      },
      {
        title: 'Capacity Building',
        description: 'Training and developing healthcare professionals for sustainable impact',
        icon: 'GraduationCap',
        href: '/programs/capacity-building',
        colorClass: 'bg-purple-100 text-purple-600',
      },
      {
        title: 'Resource Mobilization',
        description: 'Securing sustainable funding for health research and program implementation',
        icon: 'HandHeart',
        href: '/programs/resource-mobilization',
        colorClass: 'bg-orange-100 text-orange-600',
      },
    ],
  },
  impactSection: {
    title: 'Our Impact',
    subtitle: 'Making a measurable difference in communities across Africa',
    stats: [
      { value: 50000, label: 'People Reached', suffix: '+' },
      { value: 120, label: 'Research Studies', suffix: '+' },
      { value: 25, label: 'Partner Organizations', suffix: '+' },
      { value: 15, label: 'Years of Impact', suffix: '' },
    ],
  },
  newsSection: {
    title: 'Latest News',
    subtitle: 'Stay updated with our recent activities and achievements',
    viewAllText: 'View All News',
    viewAllLink: '/newsroom',
  },
  partnersSection: {
    title: 'Our Partners',
    subtitle: 'Collaborating with leading organizations to advance health research and service delivery',
  },
  ctaSection: {
    title: 'Join Us in Transforming Lives',
    description: 'Your support enables us to continue our mission of advancing health through innovative research, training, and service provision across Africa.',
    primaryButton: {
      text: 'Make a Donation',
      link: '/donate',
    },
    secondaryButton: {
      text: 'Explore Opportunities',
      link: '/opportunities/careers',
    },
  },
};

export const fallbackAboutPageContent: AboutPageContent = {
  _id: 'fallback-about',
  _type: 'aboutPageContent',
  hero: {
    title: 'Welcome to AMBSO',
    description: 'Africa Medical and Behavioural Sciences Organization (AMBSO) is a locally registered not-for-profit Research and Service based Organization that is immensely contributing to knowledge on HIV infection, other infectious and non-communicable diseases at both national and international levels.',
  },
  mission: {
    title: 'Our Mission',
    description: 'Transforming Africa through innovative research, training and service provision',
  },
  vision: {
    title: 'Our Vision',
    description: 'Complete Physical, Social and Mental well-being in Africa',
  },
  coreValues: {
    sectionTitle: 'Our Core Values',
    values: [
      {
        title: 'Integrity',
        description: 'Exhibiting ethical conduct in all our research and program services',
      },
      {
        title: 'Respect for Diversity',
        description: 'Embracing inclusivity across the execution of our services',
      },
      {
        title: 'Innovativeness',
        description: 'Continuously seeking new approaches to advancing research to solve emerging challenges',
      },
      {
        title: 'Efficiency',
        description: 'Delivering timely and resource conscious outcomes while upholding high quality standards',
      },
    ],
  },
  story: {
    title: 'Our History',
    content: undefined,
  },
  videoSection: {
    title: 'Learn More About AMBSO',
    videoUrl: 'https://www.youtube.com/embed/tNd3UStBslA',
  },
  collaboratorsSection: {
    title: 'Our Collaborators',
    subtitle: 'Working with leading institutions worldwide to advance health research',
  },
  whatWeDo: {
    sectionTitle: 'What We Do',
    items: [
      {
        title: 'Our Programs',
        description: 'We implement clinical, community, and capacity building programs across Uganda',
        link: '/programs',
        icon: 'Briefcase',
      },
      {
        title: 'Our Research',
        description: 'We conduct clinical trials and behavioral research to address health challenges',
        link: '/research',
        icon: 'Microscope',
      },
      {
        title: 'Our Partners',
        description: 'We collaborate with leading academic and research institutions globally',
        link: '/collaborations',
        icon: 'Handshake',
      },
      {
        title: 'Upcoming Events',
        description: 'Stay updated with our latest events and community activities',
        link: '/newsroom',
        icon: 'Calendar',
      },
    ],
  },
  researchFocus: {
    sectionTitle: 'Our Research Focus',
    areas: [
      {
        title: 'Clinical Trials',
        description: 'We conduct rigorous clinical research across multiple disease areas, contributing to the development of new treatments and interventions that address Africa\'s most pressing health challenges.',
      },
      {
        title: 'Epidemiological & Behavioral Research',
        description: 'Our research investigates disease patterns and behavioral factors affecting health outcomes, providing critical insights that inform policy and program development at national and international levels.',
      },
    ],
  },
};

export const fallbackStoryContent = [
  'Africa Medical and Behavioral Sciences Organization (AMBSO) was established in 2016 by experienced Ugandan epidemiologists and clinical trialists. The organization emerged from a collaborative partnership with Uro Care Hospital, initially focusing on Voluntary Medical Male Circumcision (VMMC) in partnership with the Infectious Diseases Institute (IDI), marking the beginning of our commitment to evidence-based HIV prevention strategies.',
  'In 2017, AMBSO launched the Africa Population Health Surveillance (APHS) program, a landmark initiative designed to monitor and strengthen community health outcomes. This program represents our deep commitment to public health research and community-based service delivery.',
  'Since then, we have significantly expanded our scope to address a broader spectrum of health challenges across Africa. Our work now encompasses gender-based violence prevention, substance abuse interventions, emergency resuscitation training, prostate cancer research, and comprehensive clinical trials.',
  'In 2021, AMBSO entered the clinical trials arena, further strengthening our research capabilities. Today, we operate across three core domains: clinical programs, community-based initiatives, and capacity-building efforts. We maintain strategic partnerships with leading international institutions including Karolinska Institutet, USC, Boston College, UCLA, and various East African research centers.',
];

export const fallbackContactPageContent: ContactPageContent = {
  _id: 'fallback-contact',
  _type: 'contactPageContent',
  hero: {
    title: 'Contact Us',
    description: 'Get in touch with us. We\'re here to answer your questions and discuss how we can work together.',
  },
  formSection: {
    title: 'Send us a Message',
    subjects: [
      { value: 'general', label: 'General Inquiry' },
      { value: 'research', label: 'Research Collaboration' },
      { value: 'programs', label: 'Programs Information' },
      { value: 'careers', label: 'Career Opportunities' },
      { value: 'partnership', label: 'Partnership' },
      { value: 'other', label: 'Other' },
    ],
  },
  contactInfo: {
    title: 'Contact Information',
    headquarters: 'Masaka, Uganda',
    additionalOffices: 'Additional offices in Nansana and Hoima',
    phone: '(+256) 394 500 421',
    email: 'info@ambso.org',
    weekdayHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    weekendHours: 'Saturday - Sunday: Closed',
  },
};

export const fallbackTeamPageContent: TeamPageContent = {
  _id: 'fallback-team',
  _type: 'teamPageContent',
  hero: {
    title: 'Our Team',
    description: 'Meet the dedicated professionals driving AMBSO\'s mission to transform Africa through innovative research, training, and service provision.',
  },
  leadershipIntro: 'AMBSO is led by a Board of Directors composed of Ugandan research scientists and founders. The Executive Director serves as both leader and BOD Chairperson, working with the Senior Management Team (SMT) to provide day-to-day technical oversight of our various research and program activities.',
};

export const fallbackResourcesPageContent: ResourcesPageContent = {
  _id: 'fallback-resources',
  _type: 'resourcesPageContent',
  hero: {
    title: 'Resources',
    description: 'Explore AMBSO\'s scholarly contributions including peer-reviewed publications, conference abstracts, and research presentations.',
  },
};

/**
 * Helper function to merge Sanity data with fallback data
 * Returns Sanity data if available, otherwise returns fallback
 */
export function withFallback<T>(data: T | null | undefined, fallback: T): T {
  return data ?? fallback;
}

/**
 * Deep merge for nested objects
 * Merges fallback values into data where data properties are undefined
 */
export function deepMergeWithFallback<T extends object>(
  data: Partial<T> | null | undefined,
  fallback: T
): T {
  if (!data) return fallback;

  const result = { ...fallback };

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const dataValue = data[key];
      const fallbackValue = fallback[key];

      if (dataValue !== undefined && dataValue !== null) {
        if (
          typeof dataValue === 'object' &&
          !Array.isArray(dataValue) &&
          typeof fallbackValue === 'object' &&
          !Array.isArray(fallbackValue)
        ) {
          // Recursively merge nested objects
          (result as Record<string, unknown>)[key] = deepMergeWithFallback(
            dataValue as Record<string, unknown>,
            fallbackValue as Record<string, unknown>
          );
        } else {
          // Use data value directly
          (result as Record<string, unknown>)[key] = dataValue;
        }
      }
    }
  }

  return result;
}
