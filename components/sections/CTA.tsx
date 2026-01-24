import Container from '../ui/Container';
import Button from '../ui/Button';

interface CTAProps {
  content?: {
    title?: string;
    description?: string;
    primaryButton?: { text: string; link: string };
    secondaryButton?: { text: string; link: string };
  };
}

const defaultContent = {
  title: 'Join Us in Transforming Lives',
  description:
    'Your support enables us to continue our mission of advancing health through innovative research, training, and service provision across Africa.',
  primaryButton: {
    text: 'Make a Donation',
    link: '/donate',
  },
  secondaryButton: {
    text: 'Explore Opportunities',
    link: '/opportunities/careers',
  },
};

export default function CTA({ content }: CTAProps) {
  const title = content?.title ?? defaultContent.title;
  const description = content?.description ?? defaultContent.description;
  const primaryButton = content?.primaryButton ?? defaultContent.primaryButton;
  const secondaryButton = content?.secondaryButton ?? defaultContent.secondaryButton;

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-100 mb-8 leading-relaxed">{description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={primaryButton.link} variant="secondary" size="lg">
              {primaryButton.text}
            </Button>
            <Button
              href={secondaryButton.link}
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
            >
              {secondaryButton.text}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
