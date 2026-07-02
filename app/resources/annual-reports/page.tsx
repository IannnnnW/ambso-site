'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import { getAnnualReports } from '@/lib/sanity.queries';

interface AnnualReport {
  _id: string;
  year: number;
  title: string;
  summary?: string;
  fileUrl?: string;
  coverImage?: { asset?: { url: string }; alt?: string };
}

export default function AnnualReportsPage() {
  const [reports, setReports] = useState<AnnualReport[]>([]);
  const [selected, setSelected] = useState<AnnualReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnnualReports().then((data: AnnualReport[]) => {
      setReports(data ?? []);
      if (data && data.length > 0) setSelected(data[0]);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20 lg:pt-28">
      {/* Hero */}
      <section className="relative text-white py-20 min-h-[320px] flex items-center overflow-hidden">
        <img
          src="/images/labwork.jpg"
          alt="Annual Reports"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002866]/80 via-[#002866]/60 to-[#002866]/30" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Annual Reports</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Explore AMBSO's yearly reports documenting our research, programs, and organizational impact.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <Container>
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : reports.length === 0 ? (
            <p className="text-center text-gray-500 py-24 text-lg">
              No annual reports have been published yet. Check back soon.
            </p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Report list */}
              <div className="lg:col-span-1 space-y-3">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Reports</h2>
                {reports.map((report) => {
                  const isActive = selected?._id === report._id;
                  return (
                    <button
                      key={report._id}
                      onClick={() => setSelected(report)}
                      className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'
                      }`}
                    >
                      {report.coverImage?.asset?.url ? (
                        <img
                          src={report.coverImage.asset.url}
                          alt={report.coverImage.alt ?? report.title}
                          className="w-12 h-16 object-cover rounded flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-16 bg-primary/10 rounded flex-shrink-0 flex items-center justify-center">
                          <span className="text-primary text-xs font-bold">{report.year}</span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className={`text-sm font-bold mb-0.5 ${isActive ? 'text-primary' : 'text-gray-900'}`}>
                          {report.year}
                        </div>
                        <div className="text-sm text-gray-600 line-clamp-2">{report.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* PDF preview */}
              <div className="lg:col-span-2">
                {selected ? (
                  <div>
                    <div className="flex items-start justify-between mb-5 gap-4 flex-wrap">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selected.title}</h2>
                        {selected.summary && (
                          <p className="text-gray-600 mt-2 text-sm leading-relaxed">{selected.summary}</p>
                        )}
                      </div>
                      {selected.fileUrl && (
                        <a
                          href={selected.fileUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Download PDF
                        </a>
                      )}
                    </div>

                    {selected.fileUrl ? (
                      <iframe
                        key={selected._id}
                        src={`${selected.fileUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                        className="w-full rounded-xl border border-gray-200 shadow-sm"
                        style={{ height: '70vh' }}
                        title={selected.title}
                      />
                    ) : (
                      <div className="w-full rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center" style={{ height: '70vh' }}>
                        <p className="text-gray-400 text-sm">PDF not available for this report.</p>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
