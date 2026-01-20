import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Scissors, TestTube, HeartPulse, Users } from 'lucide-react';

export default function ClinicalProgramsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Clinical Programs</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Providing evidence-based HIV prevention services through Voluntary Medical Male Circumcision
              and comprehensive clinical care.
            </p>
          </div>
        </Container>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Voluntary Medical Male Circumcision (VMMC)
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed mb-8">
              AMBSO implements VMMC services in partnership with Uro Care Hospital under service contracts
              with the Infectious Diseases Institute (IDI), aligned with UNAIDS and Uganda Ministry of Health
              HIV prevention priorities.
            </p>
            <div className="bg-primary/5 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Target Population & Service Delivery</h3>
              <p className="text-gray-700 leading-relaxed">
                VMMC services are provided to males aged 15 years and above in Wakiso and neighboring districts,
                utilizing both facility-based and community outreach approaches to maximize accessibility and impact.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Comprehensive Services */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Comprehensive Service Package
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card hover className="p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <TestTube size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">HIV Counseling & Testing</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional HIV counseling and testing services with confidential results and linkage to care.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <HeartPulse size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">STD Screening</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive screening for sexually transmitted diseases with treatment and counseling.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reproductive Health Services</h3>
              <p className="text-gray-600 leading-relaxed">
                Information and referral for reproductive health services and family planning.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <Scissors size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Medical Circumcision</h3>
              <p className="text-gray-600 leading-relaxed">
                Safe, professional medical circumcision procedures performed by trained healthcare providers.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <HeartPulse size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Post-Operative Follow-up</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive follow-up monitoring to ensure safe wound healing and address any concerns.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Coordination</h3>
              <p className="text-gray-600 leading-relaxed">
                Partnership with local governments and organizations for program coordination and demand generation.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Clinical Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
              <p className="text-gray-600">VMMC Procedures</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">20,000+</div>
              <p className="text-gray-600">HIV Tests Conducted</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <p className="text-gray-600">Districts Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Partnerships */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
              Strategic Partnerships
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
              AMBSO has established collaborative partnerships to support program coordination and
              maximize the impact of our clinical services.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-bold text-gray-900 mb-2">Uro Care Hospital</h3>
                <p className="text-sm text-gray-600">Clinical Service Partner</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-bold text-gray-900 mb-2">Infectious Diseases Institute</h3>
                <p className="text-sm text-gray-600">Program Coordination</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-bold text-gray-900 mb-2">Ministry of Health Uganda</h3>
                <p className="text-sm text-gray-600">Policy Alignment</p>
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
              Access Our Clinical Services
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Our clinical programs are designed to be accessible, professional, and client-centered.
              Contact us to learn more about our services.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
