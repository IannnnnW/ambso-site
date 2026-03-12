import { getFooterContent } from '@/lib/sanity.queries';
import { fallbackFooterContent } from '@/lib/fallback-data';
import Footer from './Footer';

export default async function FooterServer() {
  const data = await getFooterContent() ?? fallbackFooterContent;
  return <Footer data={data} />;
}
