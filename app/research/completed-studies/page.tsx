import Container from '@/components/ui/Container';

export default function CompletedStudiesPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Completed Studies</h1>
          <p className="text-xl text-gray-100 leading-relaxed max-w-3xl">
            Research studies that have been completed with results.
          </p>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gray-600">
              Publications and results from completed studies will be shared here.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
