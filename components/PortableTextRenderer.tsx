import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from 'sanity';
import { urlFor } from '@/lib/sanity.client';

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold text-gray-900 mb-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold text-gray-900 mb-5 mt-8">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-6">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-5">{children}</h4>,
    normal: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-gray-700 bg-gray-50">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-primary px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline font-medium"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ' '}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface PortableTextRendererProps {
  value: PortableTextBlock[];
  className?: string;
}

export default function PortableTextRenderer({ value, className = '' }: PortableTextRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
