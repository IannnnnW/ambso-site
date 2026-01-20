import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { Users } from 'lucide-react';

const executiveTeam = [
  {
    name: 'Dr. Stephen Watya',
    title: 'Executive Director',
    role: 'Provides strategic leadership and oversees all organizational operations',
  },
  {
    name: 'Emmanuel Kyasanku',
    title: 'Program Director',
    role: 'Leads the Senior Management Team and coordinates program implementation',
  },
  {
    name: 'Stephen Mugamba',
    title: 'Deputy Program Director',
    role: 'Supports program coordination and operational management',
  },
];

const departmentHeads = [
  {
    name: 'Alex Daama',
    title: 'Head of Epi & Behavioral Studies',
    department: 'Research',
  },
  {
    name: 'Dr. Joan Nakakande',
    title: 'Head of Clinical Trials',
    department: 'Research',
  },
  {
    name: 'James Nkale',
    title: 'Head of Programs',
    department: 'Programs',
  },
  {
    name: 'Dr. Jackson Sekiyunzi Zaake',
    title: 'Head of Pharmacy',
    department: 'Clinical Services',
  },
  {
    name: 'Robert Bulamba',
    title: 'Head of Data Department',
    department: 'Data Management',
  },
];

const supportStaff = [
  {
    name: 'Joseph Tomusange',
    title: 'Laboratory Supervisor',
  },
  {
    name: 'Michael Owor',
    title: 'Community Engagement Lead',
  },
  {
    name: 'Rachael Joy Nalugoda',
    title: 'Human Resource Officer',
  },
];

const boardMembers = [
  'Dr. Joseph Kagaayi',
  'Dr. Getrude Nakigozi',
  'Dr. Godfrey Kigozi',
  'Dr. Fred Nalugoda',
  'Grace Kigozi',
  'Deusdedit Kiwanuka',
];

export default function TeamPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Meet the dedicated professionals driving AMBSO's mission to transform Africa through
              innovative research, training, and service provision.
            </p>
          </div>
        </Container>
      </section>

      {/* Leadership Structure */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center mb-6">
              <Users className="text-primary mr-3" size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Leadership Structure
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              AMBSO is led by a Board of Directors composed of Ugandan research scientists and founders.
              The Executive Director serves as both leader and BOD Chairperson, working with the Senior
              Management Team (SMT) to provide day-to-day technical oversight of our various research
              and program activities.
            </p>
          </div>
        </Container>
      </section>

      {/* Executive Leadership */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Executive Leadership
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {executiveTeam.map((member) => (
              <Card key={member.name} className="p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-4">{member.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.role}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Department Heads */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Department Heads
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departmentHeads.map((member) => (
              <Card key={member.name} className="p-6 hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-accent/10 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent-dark">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-2">{member.title}</p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {member.department}
                </span>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Support Staff */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Support Staff
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {supportStaff.map((member) => (
              <Card key={member.name} className="p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.title}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Board of Directors */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Board of Directors
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our Board of Directors comprises distinguished Ugandan research scientists and founders
            who provide strategic guidance and governance oversight.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {boardMembers.map((member) => (
              <div
                key={member}
                className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg text-center"
              >
                <p className="font-semibold text-gray-900">{member}</p>
                <p className="text-sm text-gray-600 mt-1">Board Member</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
