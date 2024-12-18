import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import matter from 'gray-matter';
import { fileURLToPath } from 'node:url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function updateDescriptions() {
  try {
    const jobsDir = join(projectRoot, 'src', 'content', 'jobs');
    const files = await readdir(jobsDir);
    const jobFiles = files.filter(file => file.endsWith('.md'));

    console.log(`Found ${jobFiles.length} job files to process`);

    for (const file of jobFiles) {
      try {
        const filePath = join(jobsDir, file);
        const fileContent = await readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        // Create location info
        const locationInfo = data.remote 
          ? `This is a remote position based in ${data.jobLocation.addressCountry}`
          : `This position is located in ${data.location}`;

        // Convert markdown to plain text
        const plainText = content
          // Remove headers
          .replace(/#{1,6}\s/g, '')
          // Remove bold/italic
          .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
          // Remove links but keep text
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          // Remove lists
          .replace(/^[-*+]\s+/gm, '')
          .replace(/^\d+\.\s+/gm, '')
          // Remove blockquotes
          .replace(/^\>\s+/gm, '')
          // Remove code blocks
          .replace(/```[\s\S]*?```/g, '')
          .replace(/`([^`]+)`/g, '$1')
          // Remove HTML tags
          .replace(/<[^>]*>/g, '')
          // Replace multiple newlines with space
          .replace(/\n+/g, ' ')
          // Replace multiple spaces with single space
          .replace(/\s+/g, ' ')
          .trim();

        // Create final description with company name and position
        const description = `${data.hiringOrganization.name} is seeking a ${data.position}. ${locationInfo}. ${plainText}`;

        // Update frontmatter
        data.description = description;
        const newContent = matter.stringify(content, data);
        await writeFile(filePath, newContent);
        
        console.log(`✅ Updated description for: ${file}`);
        console.log(`New description (${description.split(' ').length} words):\n${description}\n`);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
        continue;
      }
    }

    console.log('🎉 All job descriptions updated successfully!');
  } catch (error) {
    console.error('❌ Fatal error updating descriptions:', error);
    process.exit(1);
  }
}

updateDescriptions(); 