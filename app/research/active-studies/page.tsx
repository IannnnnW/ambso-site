import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';

export default function ActiveStudiesPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Active Studies</h1>
          <p className="text-xl text-gray-100 leading-relaxed max-w-3xl">
            Current research studies being conducted by AMBSO.
          </p>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gray-600">
              Information about active studies will be updated here. Contact us for current research opportunities.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
