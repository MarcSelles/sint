import { getServerSideSitemap } from 'next-sitemap';

import { errorHandling } from '../../lib/prepr';

const getSitemapSlugs = async () => {
  try {
    // Add query for all slugs here
    const slugs = ['/'];

    return slugs;
  } catch (error) {
    const errorResult = await errorHandling(error);

    if (!errorResult) {
      await getSitemapSlugs();
    }
    return null;
  }
};

export const getServerSideProps = async (ctx) => {
  return getServerSideSitemap(ctx, await getSitemapSlugs());
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
