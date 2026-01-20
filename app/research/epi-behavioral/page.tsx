import Container from '@/components/ui/Container';
import { TrendingUp } from 'lucide-react';

export default function EpiBehavioralPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">EPI & Behavioral Research</h1>
          <p className="text-xl text-gray-100 leading-relaxed max-w-3xl">
            Investigating disease patterns and behavioral factors affecting health outcomes across Africa.
          </p>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <TrendingUp className="text-accent-dark" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Research Focus
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              Our epidemiological and behavioral research investigates disease patterns and behavioral
              factors affecting health outcomes, providing critical insights that inform policy and
              program development at national and international levels.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
