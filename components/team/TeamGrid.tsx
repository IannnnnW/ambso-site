'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import Container from '@/components/ui/Container';
import TeamCategoryTabs from './TeamCategoryTabs';
import TeamMemberCard from './TeamMemberCard';

interface TeamMember {
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
  order: number;
}

interface TeamGridProps {
  members: TeamMember[];
}

const departmentLabels: Record<string, string> = {
  boardMember: 'Board of Directors',
  seniorManagementTeam: 'Senior Management Team',
  researchAssociate: 'Research and Program Associates',
  headofDepartment: 'Heads of Sections',
  teamMember: 'Team Members',
};

const TREE_DEPARTMENTS = ['boardMember', 'seniorManagementTeam'];

export default function TeamGrid({ members }: TeamGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Calculate counts for each category
  const counts: Record<string, number> = {
    all: members.length,
    boardMember: members.filter((m) => m.department === 'boardMember').length,
    seniorManagementTeam: members.filter((m) => m.department === 'seniorManagementTeam').length,
    headofDepartment: members.filter((m) => m.department === 'headofDepartment').length,
    researchAssociate: members.filter((m) => m.department === 'researchAssociate').length,
  };

  // Filter members based on selected category
  const filteredMembers =
    activeCategory === 'all'
      ? members
      : members.filter((member) => member.department === activeCategory);

  // Group members by department for "all" view
  const groupedMembers =
    activeCategory === 'all'
      ? {
          boardMember: members.filter((m) => m.department === 'boardMember'),
          seniorManagementTeam: members.filter((m) => m.department === 'seniorManagementTeam'),
          researchAssociate: members.filter((m) => m.department === 'researchAssociate'),
          headofDepartment: members.filter((m) => m.department === 'headofDepartment'),
          teamMember: members.filter((m) => m.department === 'teamMember'),
        }
      : null;

  return (
    <>
      {/* Category Tabs */}
      <section className="py-8 bg-gray-50 border-b">
        <Container>
          <TeamCategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={counts}
          />
        </Container>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 bg-white">
        <Container>
          {activeCategory === 'all' && groupedMembers ? (
            // Grouped view for "Our Team" tab
            <div className="space-y-20">
              {Object.entries(groupedMembers).map(([dept, deptMembers]) => {
                if (deptMembers.length === 0) return null;
                const isTree = TREE_DEPARTMENTS.includes(dept);
                return (
                  <div key={dept}>
                    <div className="text-center mb-12">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        {departmentLabels[dept] || dept}
                      </h2>
                      <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                    </div>
                    {isTree ? (
                      <div>
                        <div className="flex flex-col items-center mb-6">
                          <div className="w-full max-w-xs">
                            <TeamMemberCard member={deptMembers[0]} />
                          </div>
                          {deptMembers.length > 1 && (
                            <div className="w-px h-8 bg-primary/30 mt-2" />
                          )}
                        </div>
                        {deptMembers.length > 1 && (
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {deptMembers.slice(1).map((member) => (
                              <TeamMemberCard key={member._id} member={member} />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {deptMembers.map((member) => (
                          <TeamMemberCard key={member._id} member={member} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // Single category view
            <>
              {filteredMembers.length > 0 ? (
                TREE_DEPARTMENTS.includes(activeCategory) ? (
                  <div>
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-full max-w-xs">
                        <TeamMemberCard member={filteredMembers[0]} />
                      </div>
                      {filteredMembers.length > 1 && (
                        <div className="w-px h-8 bg-primary/30 mt-2" />
                      )}
                    </div>
                    {filteredMembers.length > 1 && (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {filteredMembers.slice(1).map((member) => (
                          <TeamMemberCard key={member._id} member={member} />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {filteredMembers.map((member) => (
                      <TeamMemberCard key={member._id} member={member} />
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No team members found</h3>
                  <p className="text-gray-600">There are no team members in this category yet.</p>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}
