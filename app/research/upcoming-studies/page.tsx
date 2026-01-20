import Container from '@/components/ui/Container';

export default function UpcomingStudiesPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Upcoming Studies</h1>
          <p className="text-xl text-gray-100 leading-relaxed max-w-3xl">
            Research studies in planning phase.
          </p>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gray-600">
              Information about upcoming studies will be posted here. Check back for updates.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
