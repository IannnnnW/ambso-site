import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { FileText } from 'lucide-react';

export default function TendersPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tenders</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              AMBSO periodically issues tenders for goods and services. View current opportunities below.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <FileText className="text-primary" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Current Tenders</h2>
            <p className="text-lg text-gray-600 mb-8">
              No active tenders at this time. Please check back later or contact us for more information.
            </p>
            <Button href="/contact">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
