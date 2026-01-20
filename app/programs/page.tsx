import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Users, GraduationCap, Microscope } from 'lucide-react';

export default function ProgramsPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl text-gray-100 leading-relaxed max-w-3xl">
            AMBSO delivers comprehensive health solutions through three strategic pillars focused on clinical excellence,
            community empowerment, and professional development.
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-6">
                <Microscope size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Clinical Programs</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Providing quality healthcare services through Voluntary Medical Male Circumcision and evidence-based
                HIV prevention interventions.
              </p>
              <Button href="/programs/clinical" variant="outline">Learn More</Button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Programs</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Empowering communities through health education, violence prevention, substance abuse intervention,
                and community engagement.
              </p>
              <Button href="/programs/community" variant="outline">Learn More</Button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Capacity Building</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Training and developing healthcare professionals through CME, emergency resuscitation training,
                internships, and scholarly grants.
              </p>
              <Button href="/programs/capacity-building" variant="outline">Learn More</Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
