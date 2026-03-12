import { getHeaderContent } from '@/lib/sanity.queries';
import { fallbackHeaderContent } from '@/lib/fallback-data';
import Header from './Header';

export default async function HeaderServer() {
  const data = await getHeaderContent() ?? fallbackHeaderContent;
  console.log(JSON.stringify(data.navigation[1].columns.items))
  return <Header data={data} />;
}
