import rss, { pagesGlobToRssItems } from '@astrojs/rss';
export async function GET(context) {
  return rss({
     title: 'Tustin Recruiting',
    description: 'Tustin Recruiting is a boutique recruiting firm specializing in the placement of top talent in Orange County, California.',
    site: context.site,
    items: await pagesGlobToRssItems(
      import.meta.glob('./blog/*.{md,mdx}'),
    ),
  });
}