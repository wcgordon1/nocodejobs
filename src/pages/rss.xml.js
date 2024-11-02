import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const jobs = await getCollection('jobs');
  
  return rss({
    title: 'Best Electrician Jobs',
    description: 'Find the best electrician jobs - Commercial, Residential, and Industrial positions',
    site: context.site,
    items: jobs.map((job) => ({
      title: job.data.position,
      link: `/jobs/${job.slug}`,
      description: job.data.description,
      pubDate: new Date(job.data.datePosted),
      customData: `
        <location>${job.data.location}</location>
        <company>${job.data.hiringOrganization.name}</company>
        <salary>$${job.data.baseSalary.minValue} - $${job.data.baseSalary.maxValue} ${job.data.baseSalary.unitText}</salary>
        <employmentType>${job.data.employmentType}</employmentType>
        <team>${job.data.team}</team>
        <experienceRequirements>${job.data.experienceRequirements}</experienceRequirements>
      `,
    })),
  });
}