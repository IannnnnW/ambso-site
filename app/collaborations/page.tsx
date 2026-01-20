import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Handshake, Globe, Building2 } from 'lucide-react';

const internationalPartners = [
  'Karolinska Institutet',
  'University of Southern California (USC)',
  'Boston College',
  'University of California, Los Angeles (UCLA)',
];

const regionalPartners = [
  'Infectious Diseases Institute (IDI)',
  'Uro Care Hospital',
  'Ministry of Health Uganda',
  'Various East African Research Centers',
];

export default function CollaborationsPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Collaborations</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Building strategic partnerships to advance health research and service delivery across Africa.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Partnership Approach
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              AMBSO maintains strategic partnerships with leading international institutions and regional organizations,
              enabling us to deliver world-class research and services that transform lives across the continent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Globe className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">International Partners</h3>
              <ul className="space-y-3">
                {internationalPartners.map((partner) => (
                  <li key={partner} className="flex items-start text-gray-700">
                    <span className="text-primary mr-2">•</span>
                    {partner}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Building2 className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Regional Partners</h3>
              <ul className="space-y-3">
                {regionalPartners.map((partner) => (
                  <li key={partner} className="flex items-start text-gray-700">
                    <span className="text-accent-dark mr-2">•</span>
                    {partner}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Handshake className="text-primary" size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Partner With Us
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We welcome partnerships with organizations that share our commitment to transforming
              Africa through innovative research, training, and service provision.
            </p>
            <Button href="/contact" size="lg">
              Get in Touch
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
