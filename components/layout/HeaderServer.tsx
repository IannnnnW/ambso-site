import { getHeaderContent } from '@/lib/sanity.queries';
import { fallbackHeaderContent } from '@/lib/fallback-data';
import Header from './Header';

export default async function HeaderServer() {
  const data = await getHeaderContent() ?? fallbackHeaderContent;
  return <Header data={data} />;
}
