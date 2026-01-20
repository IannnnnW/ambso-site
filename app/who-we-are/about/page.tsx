import Container from '@/components/ui/Container';
import { Target, Eye, Heart, Lightbulb, CheckCircle, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About AMBSO</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Africa Medical and Behavioural Sciences Organization (AMBSO) is a Ugandan not-for-profit entity
              focused on research and service delivery regarding HIV, infectious diseases, and non-communicable conditions.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Target className="text-primary mr-3" size={32} />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Transforming Africa through innovative research, training and service provision
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Eye className="text-accent-dark mr-3" size={32} />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Complete Physical, Social and Mental well-being in Africa
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                Exhibiting ethical conduct in all our research and program services
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Respect for Diversity</h3>
              <p className="text-gray-600">
                Embracing inclusivity across all our operations and partnerships
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovativeness</h3>
              <p className="text-gray-600">
                Continuously seeking new approaches to emerging challenges
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-accent-orange" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Efficiency</h3>
              <p className="text-gray-600">
                Delivering timely, resource-conscious outcomes with quality standards
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Founded in 2016 by experienced Ugandan epidemiologists and clinical trialists, AMBSO emerged from
                a collaborative partnership with Uro Care Hospital. Our initial focus centered on Voluntary Medical
                Male Circumcision (VMMC) in partnership with the Infectious Diseases Institute, marking the beginning
                of our commitment to evidence-based HIV prevention strategies.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Since our inception, we have significantly expanded our scope to address a broader spectrum of health
                challenges across Africa. Our work now encompasses gender-based violence prevention, substance abuse
                interventions, emergency resuscitation training, prostate cancer research, and comprehensive clinical trials.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                In 2017, AMBSO established the Africa Population Health Surveillance (APHS) program, a landmark initiative
                designed to monitor and strengthen community health outcomes. This program represents our deep commitment
                to public health research and community-based service delivery.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, AMBSO operates across three core domains: clinical programs, community-based initiatives, and
                capacity-building efforts. We maintain strategic partnerships with leading international institutions
                including Karolinska Institutet, USC, Boston College, UCLA, and various East African research centers,
                enabling us to deliver world-class research and services that transform lives across the continent.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Research Focus */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Research Focus
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">Clinical Trials</h3>
              <p className="text-gray-700 leading-relaxed">
                We conduct rigorous clinical research across multiple disease areas, contributing to the development
                of new treatments and interventions that address Africa's most pressing health challenges.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">Epidemiological & Behavioral Research</h3>
              <p className="text-gray-700 leading-relaxed">
                Our research investigates disease patterns and behavioral factors affecting health outcomes, providing
                critical insights that inform policy and program development at national and international levels.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}