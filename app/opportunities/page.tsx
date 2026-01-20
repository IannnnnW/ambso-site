import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Briefcase, FileText } from 'lucide-react';

export default function OpportunitiesPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Opportunities</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Explore career opportunities and tenders at AMBSO.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card hover className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Careers</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Join our team of dedicated professionals transforming Africa through innovative research,
                training, and service provision.
              </p>
              <Button href="/opportunities/careers" variant="outline">
                View Careers
              </Button>
            </Card>

            <Card hover className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <FileText className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tenders</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                AMBSO periodically issues tenders for goods and services. View current tender opportunities
                and submission guidelines.
              </p>
              <Button href="/opportunities/tenders" variant="outline">
                View Tenders
              </Button>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}
