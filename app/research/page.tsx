import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TrendingUp, Database } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Research</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Contributing to knowledge advancement regarding HIV infection, communicable diseases,
              and non-communicable health conditions at national and international levels.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Research Focus Areas
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card hover className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Clinical Trials</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We conduct rigorous clinical research across multiple disease areas, contributing to the
                development of new treatments and interventions for Africa's most pressing health challenges.
              </p>
              <Button href="/research/clinical-trials" variant="outline">View Clinical Trials</Button>
            </Card>

            <Card hover className="p-8">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="text-accent-dark" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">EPI & Behavioral Research</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Investigating disease patterns and behavioral factors affecting health outcomes,
                providing critical insights that inform policy and program development.
              </p>
              <Button href="/research/epi-behavioral" variant="outline">Explore Research</Button>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Database className="text-primary" size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Population Health Surveillance (APHS)
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Established in 2017, the Africa Population Health Surveillance (APHS) program monitors and strengthens
              community health outcomes, marking AMBSO's commitment to public health research and community-based service delivery.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Studies
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card hover href="/research/active-studies" className="p-6 text-center">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">●</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Active Studies</h3>
              <p className="text-gray-600 text-sm">Currently ongoing research projects</p>
            </Card>

            <Card hover href="/research/upcoming-studies" className="p-6 text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">◐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upcoming Studies</h3>
              <p className="text-gray-600 text-sm">Studies in planning phase</p>
            </Card>

            <Card hover href="/research/completed-studies" className="p-6 text-center">
              <div className="w-14 h-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Completed Studies</h3>
              <p className="text-gray-600 text-sm">Finished research with results</p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Research Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-gray-600">Research Studies</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-gray-600">Publications</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <p className="text-gray-600">Research Partners</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <p className="text-gray-600">Research Participants</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Collaborate on Research
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Interested in partnering with us on research or participating in our studies?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/collaborations" variant="secondary" size="lg">
                Partner With Us
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                Contact Research Team
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
