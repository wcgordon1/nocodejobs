import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET(context) {
  const jobs = await getCollection('jobs');
  
  return rss({
    title: 'No Code Jobs',
    description: 'No Code Jobs RSS Feed. Post our No Code Jobs to your Job Board!',
    site: context.site,
    items: jobs.map((job) => ({
      title: job.data.position,
      pubDate: new Date(job.data.datePosted),
      description: `
        <div>
          <img src="${job.data.hiringOrganization.logo}" alt="${job.data.hiringOrganization.name} logo" style="max-width: 200px; margin-bottom: 20px;" />
          <h2>${job.data.position}</h2>
          <p><strong>Company:</strong> ${job.data.hiringOrganization.name}</p>
          <p><strong>Location:</strong> ${job.data.location}</p>
          <p><strong>Salary Range:</strong> $${job.data.baseSalary.minValue} - $${job.data.baseSalary.maxValue} ${job.data.baseSalary.unitText}</p>
          <p><strong>Job Type:</strong> ${job.data.employmentType}</p>
          <p><strong>Remote:</strong> No</p>
          <br/>
          <p>${job.data.description}</p>
        </div>
      `,
      link: `${context.site}jobs/${job.slug}`,
      customData: `
        <company>${job.data.hiringOrganization.name}</company>
        <companyLogo>${job.data.hiringOrganization.logo}</companyLogo>
        <datePosted>${job.data.datePosted}</datePosted>
        <location>${job.data.location}</location>
        <salary>
          <currency>${job.data.baseSalary.currency}</currency>
          <minimum>${job.data.baseSalary.minValue}</minimum>
          <maximum>${job.data.baseSalary.maxValue}</maximum>
          <unit>${job.data.baseSalary.unitText}</unit>
        </salary>
        <remote>false</remote>
        <employmentType>${job.data.employmentType}</employmentType>
      `,
    })),
  });
}