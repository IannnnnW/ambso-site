'use client';

import { FileText, ExternalLink, Calendar, Users, Download, Presentation } from 'lucide-react';

interface ResourceCardProps {
  resource: {
    _id: string;
    title: string;
    slug: { current: string };
    Conference?: string;
    resourceType: string;
    file?: {
      asset: {
        _ref: string;
        url?: string;
      };
    };
    externalLink?: string;
    publishedDate?: string;
    authors?: string[];
    featured?: boolean;
  };
  variant?: 'card' | 'row';
}

export default function ResourceCard({ resource, variant = 'card' }: ResourceCardProps) {
  const year = resource.publishedDate
    ? new Date(resource.publishedDate).getFullYear()
    : null;

  const authorsDisplay = resource.authors?.join(', ') || 'AMBSO';
  const link = resource.externalLink || resource.file?.asset?.url || '#';
  const isPublication = resource.resourceType === 'publication';
  const isAbstract = resource.resourceType === 'abstract';

  if (variant === 'row') {
    return (
      <div className="group bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Year Badge */}
            {year && (
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary font-bold text-lg rounded-xl">
                  {year}
                </span>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {resource.title}
              </h3>

              {/* Authors/Presenters */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span className="line-clamp-1">{authorsDisplay}</span>
              </div>

              {/* Conference (for abstracts) */}
              {isAbstract && resource.Conference && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Presentation className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{resource.Conference}</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0 mt-2 md:mt-0">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium"
              >
                {resource.file?.asset?.url ? (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    <span>View</span>
                  </>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Card variant
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Header with Type Badge */}
      <div className="p-6 pb-4 border-b border-gray-50">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${isPublication ? 'bg-blue-50' : 'bg-amber-50'}`}>
              {isPublication ? (
                <FileText className={`w-5 h-5 ${isPublication ? 'text-blue-600' : 'text-amber-600'}`} />
              ) : (
                <Presentation className="w-5 h-5 text-amber-600" />
              )}
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              isPublication ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {isPublication ? 'Publication' : 'Abstract'}
            </span>
          </div>
          {year && (
            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-3 leading-snug">
          {resource.title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-6 pt-4 flex-1 flex flex-col">
        {/* Authors */}
        <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
          <Users className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2">{authorsDisplay}</span>
        </div>

        {/* Conference (for abstracts) */}
        {isAbstract && resource.Conference && (
          <div className="flex items-start gap-2 text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{resource.Conference}</span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-primary hover:text-white transition-all text-sm font-medium mt-4"
        >
          {resource.file?.asset?.url ? (
            <>
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </>
          ) : (
            <>
              <ExternalLink className="w-4 h-4" />
              <span>View Resource</span>
            </>
          )}
        </a>
      </div>
    </div>
  );
}
