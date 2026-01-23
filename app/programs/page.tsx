import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PartnersCarousel from '@/components/layout/partnersCoursel';

import { 
  GraduationCap, 
  Microscope, 
  DollarSign,
  Stethoscope,
  HandHeart
} from 'lucide-react';
import { ProgramCategory, Partner } from '@/lib/sanity.types';
import { getProgramCategories, getFeaturedPartners } from '@/lib/sanity.queries';

// Icon mapping function
function getCategoryIcon(slug: string) {
  const iconMap: Record<string, any> = {
    'capacity-building-programs': GraduationCap,
    'clinical-programs': Stethoscope,
    'resource-mobilization': DollarSign,
    'community-programs': HandHeart,
  };
  
  return iconMap[slug] || Microscope;
}

// Color mapping function
function getCategoryColor(slug: string) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    'capacity-building-programs': { bg: 'bg-blue-100', text: 'text-blue-600' },
    'clinical-programs': { bg: 'bg-blue-100', text: 'text-blue-600' },
    'resource-mobilization': { bg: 'bg-blue-100', text: 'text-blue-600' },
    'community-programs': { bg: 'bg-blue-100', text: 'text-blue-600' },
  };
  
  return colorMap[slug] || { bg: 'bg-blue-100', text: 'text-primary' };
}

export default async function ProgramsPage() {
  const categories: ProgramCategory[] = await getProgramCategories();
  const partners: Partner[] = await getFeaturedPartners();
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl text-gray-100 leading-relaxed max-w-3xl">
            AMBSO delivers comprehensive health solutions through strategic pillars focused on clinical excellence,
            community empowerment, and professional development.
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.slug.current);
              const colors = getCategoryColor(category.slug.current);
              
              return (
                <div 
                  key={category._id} 
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full"
                >
                  <div className={`w-16 h-16 ${colors.bg} ${colors.text} rounded-full flex items-center justify-center mb-6`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {category.shortDescription}
                  </p>
                  <div className="mt-auto">
                    <Button href={`/programs/${category.slug.current}`} variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Partners Carousel Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Working together with leading organizations to deliver impactful health solutions
            </p>
          </div>
          <PartnersCarousel partners={partners} />
        </Container>
      </section>
    </div>
  );
}