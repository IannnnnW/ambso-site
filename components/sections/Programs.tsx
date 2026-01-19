import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Microscope, Users, GraduationCap, HandHeart } from 'lucide-react';

const programs = [
  {
    title: 'Clinical Programs',
    description: 'Providing quality healthcare services through clinical trials and medical interventions',
    icon: Microscope,
    href: '/programs/clinical',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Community Programs',
    description: 'Empowering communities with health education and preventive care initiatives',
    icon: Users,
    href: '/programs/community',
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Capacity Building',
    description: 'Training and developing healthcare professionals for sustainable impact',
    icon: GraduationCap,
    href: '/programs/capacity-building',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Resource Mobilization',
    description: 'Securing sustainable funding for health research and program implementation',
    icon: HandHeart,
    href: '/programs/resource-mobilization',
    color: 'bg-orange-100 text-orange-600',
  },
];

export default function Programs() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver comprehensive health solutions through four strategic pillars
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Card key={program.title} hover className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${program.color} mb-4`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {program.description}
                </p>
                <Button href={program.href} variant="outline" size="sm">
                  Learn More
                </Button>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
