import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Stethoscope, BookOpen, Award, Handshake, Users2 } from 'lucide-react';

const programs = [
  {
    title: 'Emergency Resuscitation Training',
    description: 'Hands-on instruction in emergency response and resuscitation techniques for healthcare professionals and first responders.',
    icon: Stethoscope,
    color: 'bg-red-100 text-red-600',
    features: [
      'Basic Life Support (BLS)',
      'Advanced Cardiac Life Support (ACLS)',
      'Pediatric Emergency Care',
      'First Aid Training',
    ],
  },
  {
    title: 'Continuous Medical Education (CME)',
    description: 'Ongoing professional development opportunities to keep medical staff current with evolving practices and medical advancements.',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600',
    features: [
      'Monthly CME sessions',
      'Specialized training workshops',
      'Online learning modules',
      'Certification programs',
    ],
  },
  {
    title: 'AMBSO Scholarly Grant',
    description: 'Supporting researchers and professionals pursuing advanced studies and innovative projects within our focus areas.',
    icon: Award,
    color: 'bg-purple-100 text-purple-600',
    features: [
      'Research funding',
      'Academic scholarships',
      'Conference attendance support',
      'Publication assistance',
    ],
  },
  {
    title: 'Technical Assistance',
    description: 'Expert support and guidance to partner organizations and healthcare facilities to strengthen their capacity.',
    icon: Handshake,
    color: 'bg-green-100 text-green-600',
    features: [
      'Program design support',
      'Quality improvement initiatives',
      'Monitoring and evaluation',
      'Strategic planning',
    ],
  },
  {
    title: 'Internship Training',
    description: 'Creating opportunities for students and early-career professionals to gain practical experience in clinical and research settings.',
    icon: Users2,
    color: 'bg-orange-100 text-orange-600',
    features: [
      'Clinical internships',
      'Research internships',
      'Mentorship programs',
      'Skills development',
    ],
  },
];

export default function CapacityBuildingPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Capacity Building</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Strengthening healthcare infrastructure and human resources through comprehensive
              training, education, and professional development programs.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Building a Stronger Healthcare Workforce
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our capacity building programs align with AMBSO's mission of transforming Africa through
              innovative training and service provision. We invest in developing medical and technical
              expertise to create sustainable impact across the region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <Card key={program.title} hover className="p-6">
                  <div className={`w-16 h-16 ${program.color} rounded-full flex items-center justify-center mb-4`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                  <div className="space-y-2">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-start text-sm text-gray-600">
                        <span className="text-primary mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Training Stats */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Training Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <p className="text-gray-600">Healthcare Professionals Trained</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-gray-600">Training Programs Conducted</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30+</div>
              <p className="text-gray-600">Interns Mentored</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-gray-600">Grants Awarded</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Who Can Apply */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Who Can Participate
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary/5 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Healthcare Professionals</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Doctors and clinical officers
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Nurses and midwives
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Laboratory technicians
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Pharmacists
                  </li>
                </ul>
              </div>

              <div className="bg-accent/10 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Students & Researchers</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-accent-dark mr-2">•</span>
                    Medical students
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-dark mr-2">•</span>
                    Public health students
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-dark mr-2">•</span>
                    Research assistants
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-dark mr-2">•</span>
                    Early-career researchers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Advance Your Career With AMBSO
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Join our capacity building programs and be part of the next generation of
              healthcare professionals transforming Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/opportunities/careers" variant="secondary" size="lg">
                View Opportunities
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
