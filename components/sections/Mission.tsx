import Container from '../ui/Container';
import { Target, Eye, Award } from 'lucide-react';

export default function Mission() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Target className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Transforming Africa through innovative research, training and service provision
            </p>
          </div>

          {/* Vision */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Eye className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              Complete Physical, Social and Mental well-being in Africa
            </p>
          </div>

          {/* Values */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Award className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
            <p className="text-gray-600 leading-relaxed">
              Integrity, Respect for diversity, Innovativeness, and Efficiency
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
