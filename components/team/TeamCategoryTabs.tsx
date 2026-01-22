'use client';

import { Users, Award, Briefcase, UserCog } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Our Team', icon: Users },
  { id: 'boardMember', label: 'Board', icon: Award },
  { id: 'seniorManagementTeam', label: 'SMT', icon: Briefcase },
  { id: 'headofDepartment', label: 'HoD', icon: UserCog },
];

interface TeamCategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  counts?: Record<string, number>;
}

export default function TeamCategoryTabs({
  activeCategory,
  onCategoryChange,
  counts,
}: TeamCategoryTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        const count = counts?.[category.id];

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              inline-flex items-center gap-2 px-4 md:px-6 py-3 rounded-full font-medium transition-all duration-300
              ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-primary border border-gray-200'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{category.label}</span>
            {count !== undefined && (
              <span
                className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}
                `}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
