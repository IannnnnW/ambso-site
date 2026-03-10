import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Briefcase, FileText } from 'lucide-react';

export default function OpportunitiesPage() {
  return (
    <div className="pt-20 lg:pt-28">
      <section className="relative text-white py-20 min-h-[420px] flex items-center overflow-hidden">
        <img
          src="/ambso-site/images/staff-extended.jpg"
          alt="AMBSO Staff"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002866]/75 via-[#002866]/55 to-[#002866]/30" />
        <Container className="relative z-10">
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
