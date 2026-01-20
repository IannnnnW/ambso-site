import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { FileText, Download, BookOpen, Video } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Access publications, reports, and educational materials from AMBSO's research and programs.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card hover className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Publications</h3>
              <p className="text-sm text-gray-600">Research papers and articles</p>
            </Card>

            <Card hover className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-green-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Reports</h3>
              <p className="text-sm text-gray-600">Annual reports and impact studies</p>
            </Card>

            <Card hover className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-purple-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Educational Materials</h3>
              <p className="text-sm text-gray-600">Training guides and manuals</p>
            </Card>

            <Card hover className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="text-orange-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Media</h3>
              <p className="text-sm text-gray-600">Videos and presentations</p>
            </Card>
          </div>

          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-gray-600">
              Resources coming soon. Contact us for specific materials or information.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
