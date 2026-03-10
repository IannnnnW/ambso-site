import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function ClinicalTrialsPage() {
  return (
    <div className="pt-20 lg:pt-28">
      <section className="relative text-white py-20 min-h-[420px] flex items-center overflow-hidden">
        <img
          src="/ambso-site/images/labwork.jpg"
          alt="AMBSO Laboratory Work"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002866]/75 via-[#002866]/55 to-[#002866]/30" />
        <Container className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Clinical Trials</h1>
          <p className="text-xl text-gray-100 leading-relaxed max-w-3xl">
            AMBSO conducts rigorous clinical research across multiple disease areas, contributing to the
            development of new treatments and interventions for Africa's health challenges.
          </p>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Clinical Trial Portfolio</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We conduct clinical trials in HIV prevention, treatment research, and other critical health areas.
              Our trials adhere to international ethical standards and regulatory requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/research/active-studies">View Active Studies</Button>
              <Button href="/contact" variant="outline">Participate in Research</Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
