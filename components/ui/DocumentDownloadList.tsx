import { Download } from 'lucide-react';
import type { DownloadableDocument } from '@/lib/sanity.types';

interface DocumentDownloadListProps {
  title?: string;
  documents?: DownloadableDocument[];
}

export default function DocumentDownloadList({
  title = 'Supporting Documents',
  documents,
}: DocumentDownloadListProps) {
  const docs = (documents ?? []).filter((doc) => doc.url);
  if (docs.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-3">
        {docs.map((doc, i) => (
          <a
            key={i}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Download size={18} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {doc.title ?? doc.filename ?? `Document ${i + 1}`}
              </p>
              {doc.description && <p className="text-sm text-gray-500">{doc.description}</p>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
