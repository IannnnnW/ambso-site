import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { PortableText } from '@portabletext/react';
import {
  getResearchArea,
  getResearchProject,
  getAllResearchProjectSlugs,
} from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import { Collaborator } from '@/lib/sanity.types';
import {
  ArrowLeft,
  Calendar,
  Users,
  Target,
  Building2,
  FileText,
  TrendingUp,
  User,
  ExternalLink,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ category: string; slug: string; projectSlug: string }>;
}

// ── helpers ───────────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<string, string> = {
  ongoing:   'bg-accent/20 text-accent border border-accent/40',
  upcoming:  'bg-amber-100 text-amber-700 border border-amber-200',
  completed: 'bg-gray-100 text-gray-600 border border-gray-200',
  suspended: 'bg-red-100 text-red-600 border border-red-200',
};

function formatDate(d?: string) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

// ── static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllResearchProjectSlugs().catch(() => []);
  return (slugs ?? [])
    .filter((s: { projectSlug: string; areaSlug: string }) => s.projectSlug && s.areaSlug)
    .map((s: { projectSlug: string; areaSlug: string }) => ({
      category:    'research',
      slug:        s.areaSlug,
      projectSlug: s.projectSlug,
    }));
}

// ── metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps) {
  const { projectSlug } = await params;
  const project = await getResearchProject(projectSlug);
  if (!project) return { title: 'Research Project Not Found | AMBSO' };
  return {
    title: `${project.title} | AMBSO Research`,
    description: project.summary ?? `Learn about the ${project.title} research project at AMBSO`,
  };
}

// ── page ──────────────────────────────────────────────────────────────────────

export default async function ResearchProjectPage({ params }: PageProps) {
  const { slug, projectSlug } = await params;

  const [project, area] = await Promise.all([
    getResearchProject(projectSlug),
    getResearchArea(slug),
  ]);

  if (!project) notFound();

  const heroImage = project.featuredImage?.asset
    ? urlFor(project.featuredImage).width(1920).height(600).url()
    : area?.featuredImage?.asset
      ? urlFor(area.featuredImage).width(1920).height(600).url()
      : '/images/labwork.jpg';

  const statusStyle = STATUS_BADGE[project.status] ?? STATUS_BADGE.ongoing;

  const hasEnrollment = project.targetEnrollment != null || project.currentEnrollment != null;
  const hasPartners   = project.partners        && project.partners.length        > 0;
  const hasCoIs       = project.coInvestigators && project.coInvestigators.length > 0;

  type CollabGroup = { partner: Collaborator['partner']; people: Collaborator[] };
  const collaboratorGroups: CollabGroup[] = [];
  if (project.collaborators && project.collaborators.length > 0) {
    const map = new Map<string, CollabGroup>();
    for (const c of project.collaborators) {
      const key = c.partner?._id ?? 'unknown';
      if (!map.has(key)) map.set(key, { partner: c.partner, people: [] });
      map.get(key)!.people.push(c);
    }
    collaboratorGroups.push(...map.values());
  }

  return (
    <div className="pt-20 lg:pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <AnimateOnScroll animation="fade-down" threshold={0}>
        <section className="relative text-white py-20 md:py-28 overflow-hidden">
          <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/82 to-primary/55" />

          {/* Arc decor */}
          <svg
            className="absolute right-0 inset-y-0 h-full opacity-[0.07] pointer-events-none"
            viewBox="0 0 360 360" fill="none" preserveAspectRatio="xMaxYMid slice"
            aria-hidden="true"
          >
            {[300, 240, 180, 120, 60].map((r, i) => (
              <circle key={i} cx="360" cy="180" r={r} stroke="white" strokeWidth="1.5" />
            ))}
          </svg>

          <Container className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap">
              <Link href="/programs/research" className="hover:text-white transition-colors">Research</Link>
              <span>/</span>
              {area && (
                <>
                  <Link href={`/programs/research/${slug}`} className="hover:text-white transition-colors">
                    {area.title}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-white/80">{project.title}</span>
            </div>

            {/* Status badge */}
            {project.status && (
              <div className="mb-5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${statusStyle}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight max-w-4xl">
              {project.title}
            </h1>

            {project.summary && (
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl">{project.summary}</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-white/65 text-sm">
              {project.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>
                    {formatDate(project.startDate)}
                    {project.endDate ? ` – ${formatDate(project.endDate)}` : ' – Ongoing'}
                  </span>
                </div>
              )}
              {project.principalInvestigator && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>PI: {project.principalInvestigator.name}</span>
                </div>
              )}
              {project.fundingSource && (
                <div className="flex items-center gap-2">
                  <Building2 size={16} />
                  <span>{project.fundingSource}</span>
                </div>
              )}
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── Main content ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-14">

              {/* Description */}
              {project.description && project.description.length > 0 && (
                <AnimateOnScroll animation="fade-up" threshold={0.05}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="block w-6 h-px bg-[#38BDF8]" />
                      <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Overview</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#002866] mb-6">
                      About This Project
                    </h2>
                    <div className="prose prose-lg max-w-none text-[#1f2937]/75 prose-headings:text-[#002866] prose-a:text-[#38BDF8]">
                      <PortableText value={project.description} />
                    </div>
                  </div>
                </AnimateOnScroll>
              )}

              {/* Objectives */}
              {project.objectives && project.objectives.length > 0 && (
                <AnimateOnScroll animation="fade-up" threshold={0.05}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="block w-6 h-px bg-[#38BDF8]" />
                      <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Goals</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#002866] mb-6 flex items-center gap-3">
                      <Target className="text-[#38BDF8] flex-shrink-0" size={26} />
                      Research Objectives
                    </h2>
                    <div className="space-y-3">
                      {project.objectives.map((obj: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 p-4 bg-[#f8f9fb] rounded-xl border border-[#002866]/[0.06]"
                        >
                          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#002866] flex items-center justify-center text-white text-xs font-extrabold">
                            {i + 1}
                          </span>
                          <p className="text-[#1f2937]/75 leading-relaxed pt-0.5">{obj}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}

              {/* Publications */}
              {project.publications && project.publications.length > 0 && (
                <AnimateOnScroll animation="fade-up" threshold={0.05}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="block w-6 h-px bg-[#38BDF8]" />
                      <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Outputs</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#002866] mb-6 flex items-center gap-3">
                      <FileText className="text-[#38BDF8] flex-shrink-0" size={26} />
                      Publications
                    </h2>
                    <div className="space-y-4">
                      {project.publications.map((pub: {
                        title: string; authors: string; journal: string;
                        year: number; doi?: string; url?: string;
                      }, i: number) => (
                        <div key={i} className="p-5 bg-[#f8f9fb] rounded-xl border border-[#002866]/[0.06]">
                          <p className="font-semibold text-[#1f2937] mb-1">{pub.title}</p>
                          <p className="text-sm text-[#1f2937]/60 mb-1">{pub.authors}</p>
                          <p className="text-sm text-[#1f2937]/50">
                            <em>{pub.journal}</em>, {pub.year}
                            {pub.doi && (
                              <> · <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-[#38BDF8] hover:underline">DOI: {pub.doi}</a></>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}

              {/* Collaborators */}
              {collaboratorGroups.length > 0 && (
                <AnimateOnScroll animation="fade-up" threshold={0.05}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="block w-6 h-px bg-[#38BDF8]" />
                      <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Team</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#002866] mb-8 flex items-center gap-3">
                      <Users className="text-[#38BDF8] flex-shrink-0" size={26} />
                      Collaborators
                    </h2>

                    <div className="space-y-10">
                      {collaboratorGroups.map((group) => (
                        <div key={group.partner?._id ?? 'unknown'}>
                          {/* Institution subheading */}
                          <div className="flex items-center gap-3 mb-5">
                            {group.partner?.logo?.asset?.url && (
                              <img
                                src={group.partner.logo.asset.url}
                                alt={group.partner.name ?? ''}
                                className="h-8 w-auto object-contain"
                              />
                            )}
                            <h3 className="text-base font-bold text-[#002866]">
                              {group.partner?.name ?? 'Partner Institution'}
                            </h3>
                          </div>

                          {/* People grid — matches collaborations/[slug] card style */}
                          <div className={`grid gap-6 ${group.people.length === 1 ? 'md:grid-cols-1 max-w-sm' : 'sm:grid-cols-2'}`}>
                            {group.people.map((collab) => (
                              <div key={collab._id} className="bg-gray-50 rounded-xl p-6 flex flex-col">
                                <div className="flex items-start gap-4 mb-4">
                                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                                    {collab.picture?.asset?.url ? (
                                      <img
                                        src={collab.picture.asset.url}
                                        alt={collab.picture.alt ?? collab.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : collab.picture?.asset ? (
                                      <img
                                        src={urlFor(collab.picture).width(160).height(160).url()}
                                        alt={collab.picture.alt ?? collab.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                                        {collab.name.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900 text-lg leading-tight">{collab.name}</h4>
                                    {collab.title && (
                                      <p className="text-primary text-sm font-medium mt-0.5">{collab.title}</p>
                                    )}
                                    <p className="text-gray-500 text-sm mt-0.5">{collab.position}</p>
                                  </div>
                                </div>

                                {collab.bio && (
                                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{collab.bio}</p>
                                )}

                                {collab.profileUrl && (
                                  <a
                                    href={collab.profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1 mt-auto"
                                  >
                                    View profile <ExternalLink size={13} />
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}
            </div>

            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <AnimateOnScroll animation="fade-left" delay={150} threshold={0.05}>
              <div className="space-y-6">

                {/* Enrollment */}
                {hasEnrollment && (
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <TrendingUp className="text-[#38BDF8]" size={18} />
                      Enrollment
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {project.currentEnrollment != null && (
                        <div className="text-center">
                          <div className="text-3xl font-extrabold text-primary">{project.currentEnrollment.toLocaleString()}</div>
                          <div className="text-xs text-gray-500 mt-1">Enrolled</div>
                        </div>
                      )}
                      {project.targetEnrollment != null && (
                        <div className="text-center">
                          <div className="text-3xl font-extrabold text-gray-700">{project.targetEnrollment.toLocaleString()}</div>
                          <div className="text-xs text-gray-500 mt-1">Target</div>
                        </div>
                      )}
                    </div>
                    {project.currentEnrollment != null && project.targetEnrollment != null && project.targetEnrollment > 0 && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{Math.round((project.currentEnrollment / project.targetEnrollment) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${Math.min(100, (project.currentEnrollment / project.targetEnrollment) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Principal Investigator */}
                {project.principalInvestigator && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <User className="text-[#38BDF8]" size={18} />
                      Principal Investigator
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#002866]/10 flex-shrink-0 flex items-center justify-center">
                        {project.principalInvestigator.image?.asset ? (
                          <img
                            src={urlFor(project.principalInvestigator.image).width(48).height(48).url()}
                            alt={project.principalInvestigator.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={20} className="text-[#002866]" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1f2937]">{project.principalInvestigator.name}</p>
                        <p className="text-xs text-[#1f2937]/55">{project.principalInvestigator.role}</p>
                      </div>
                    </div>
                    {project.principalInvestigator.email && (
                      <a href={`mailto:${project.principalInvestigator.email}`} className="inline-block mt-3 text-sm text-[#38BDF8] hover:underline">
                        {project.principalInvestigator.email}
                      </a>
                    )}
                  </div>
                )}

                {/* Co-Investigators */}
                {hasCoIs && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <Users className="text-[#38BDF8]" size={18} />
                      Co-Investigators
                    </h3>
                    <div className="space-y-3">
                      {project.coInvestigators!.map((ci: {
                        _id?: string; _type?: string; name: string;
                        role?: string; position?: string;
                        image?: { asset?: { url?: string }; alt?: string };
                        picture?: { asset?: { url?: string }; alt?: string };
                      }, i: number) => {
                        const photo = ci._type === 'collaborator' ? ci.picture : ci.image;
                        const photoUrl = photo?.asset?.url;
                        return (
                          <div key={ci._id ?? i} className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#002866]/10 flex-shrink-0 flex items-center justify-center">
                              {photoUrl ? (
                                <img
                                  src={photoUrl}
                                  alt={photo?.alt ?? ci.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User size={16} className="text-[#002866]" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#1f2937]">{ci.name}</p>
                              {(ci.role ?? ci.position) && (
                                <p className="text-xs text-[#1f2937]/55">{ci.role ?? ci.position}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Funding */}
                {project.fundingSource && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-3 flex items-center gap-2">
                      <Building2 className="text-[#38BDF8]" size={18} />
                      Funding
                    </h3>
                    <p className="text-[#1f2937]/75 text-sm">{project.fundingSource}</p>
                  </div>
                )}

                {/* Partners */}
                {hasPartners && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <Building2 className="text-[#38BDF8]" size={18} />
                      Partners
                    </h3>
                    <div className="space-y-3">
                      {project.partners!.map((p: { _id?: string; name: string; logo?: { asset?: { _ref: string } }; website?: string }, i: number) => (
                        <div key={p._id ?? i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white border border-[#002866]/10 flex items-center justify-center flex-shrink-0">
                            {p.logo?.asset ? (
                              <img src={urlFor(p.logo).height(28).url()} alt={p.name} className="h-5 w-auto object-contain" />
                            ) : (
                              <Building2 size={14} className="text-[#002866]/40" />
                            )}
                          </div>
                          {p.website ? (
                            <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#1f2937] hover:text-[#002866] transition-colors">
                              {p.name}
                            </a>
                          ) : (
                            <span className="text-sm font-medium text-[#1f2937]">{p.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div
                  className="p-6 rounded-2xl text-white"
                  style={{ background: 'linear-gradient(135deg, #002866 0%, #003d99 100%)' }}
                >
                  <h3 className="text-base font-extrabold mb-2">Interested in Participating?</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Contact our research team to learn about eligibility and how to get involved.
                  </p>
                  <Button href="/contact" className="w-full !bg-[#38BDF8] !text-[#002866] !border-0 font-bold text-sm">
                    Contact Research Team
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Keywords */}
      {project.keywords && project.keywords.length > 0 && (
        <section className="py-8 bg-[#f8f9fb] border-t border-gray-100">
          <Container>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-500 mr-2">Keywords:</span>
              {project.keywords.map((kw: string) => (
                <span key={kw} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full">
                  {kw}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
