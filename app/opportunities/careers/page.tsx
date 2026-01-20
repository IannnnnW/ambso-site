import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Briefcase, Users, Clock } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Careers</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Join our team of dedicated professionals transforming Africa through innovative research,
              training, and service provision.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Work at AMBSO?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At AMBSO, you'll be part of a dynamic team making real impact in communities across Africa.
              We offer opportunities for professional growth, meaningful work, and competitive benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Meaningful Work</h3>
              <p className="text-sm text-gray-600">Contribute to health research and programs that transform lives</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Collaborative Culture</h3>
              <p className="text-sm text-gray-600">Work with diverse, talented professionals from around the world</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-purple-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Professional Growth</h3>
              <p className="text-sm text-gray-600">Access training, mentorship, and career development opportunities</p>
            </Card>
          </div>

          <div className="text-center bg-gray-50 p-12 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Openings</h3>
            <p className="text-gray-600 mb-6">
              We regularly post new opportunities. Check back soon or contact us to learn about upcoming positions.
            </p>
            <Button href="/contact">
              Get in Touch
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
