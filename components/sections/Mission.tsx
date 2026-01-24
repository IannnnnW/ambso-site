import Container from '../ui/Container';
import { Target, Eye, Award } from 'lucide-react';

interface MissionProps {
  content?: {
    mission?: { title: string; description: string };
    vision?: { title: string; description: string };
    values?: { title: string; description: string };
  };
}

const defaultContent = {
  mission: {
    title: 'Our Mission',
    description: 'Transforming Africa through innovative research, training and service provision',
  },
  vision: {
    title: 'Our Vision',
    description: 'Complete Physical, Social and Mental well-being in Africa',
  },
  values: {
    title: 'Our Values',
    description: 'Integrity, Respect for diversity, Innovativeness, and Efficiency',
  },
};

export default function Mission({ content }: MissionProps) {
  const data = {
    mission: content?.mission ?? defaultContent.mission,
    vision: content?.vision ?? defaultContent.vision,
    values: content?.values ?? defaultContent.values,
  };

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Target className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{data.mission.title}</h3>
            <p className="text-gray-600 leading-relaxed">{data.mission.description}</p>
          </div>

          {/* Vision */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Eye className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{data.vision.title}</h3>
            <p className="text-gray-600 leading-relaxed">{data.vision.description}</p>
          </div>

          {/* Values */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Award className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{data.values.title}</h3>
            <p className="text-gray-600 leading-relaxed">{data.values.description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
