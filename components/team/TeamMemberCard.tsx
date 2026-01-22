'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity.client';

interface TeamMemberCardProps {
  member: {
    _id: string;
    name: string;
    slug: { current: string };
    role: string;
    department?: string;
    image?: {
      asset: {
        _ref: string;
      };
      alt?: string;
    };
  };
  variant?: 'default' | 'compact';
}

export default function TeamMemberCard({ member, variant = 'default' }: TeamMemberCardProps) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  if (variant === 'compact') {
    return (
      <Link
        href={`/who-we-are/team/${member.slug.current}`}
        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
          {member.image?.asset ? (
            <>
              <Image
                src={urlFor(member.image).width(400).height(500).url()}
                alt={member.image.alt || member.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
              <span className="text-4xl font-bold text-primary/60">{initials}</span>
            </div>
          )}
        </div>
        <div className="p-4 text-center">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {member.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{member.role}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/who-we-are/team/${member.slug.current}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
     <div className="aspect-[3/4] relative bg-gray-100 overflow-hidden">
        {member.image?.asset ? (
          <>
            <Image
              src={urlFor(member.image).width(600).height(800).url()}
              alt={member.image.alt || member.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
            <span className="text-5xl font-bold text-primary/60">{initials}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-primary font-medium mt-1">{member.role}</p>
      </div>
    </Link>
  );
}
