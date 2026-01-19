import Container from '../ui/Container';
import Button from '../ui/Button';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Transforming Lives
          </h2>
          <p className="text-xl text-gray-100 mb-8 leading-relaxed">
            Your support enables us to continue our mission of advancing health through innovative research,
            training, and service provision across Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href="/donate"
              variant="secondary"
              size="lg"
            >
              Make a Donation
            </Button>
            <Button
              href="/opportunities/careers"
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
            >
              Explore Opportunities
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
