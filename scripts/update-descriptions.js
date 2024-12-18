import { OpenAI } from 'openai';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import matter from 'gray-matter';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Load environment variables
dotenv.config({ path: join(__dirname, 'config', '.env.local') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function updateJobDescriptions() {
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

        const locationInfo = data.remote 
          ? `This is a remote position based in ${data.jobLocation.addressCountry}`
          : `This position is located in ${data.location}`;

        const prompt = `
          Create a comprehensive single paragraph job description (approximately 400 words) that flows naturally.
          Start with: "${data.hiringOrganization.name} is seeking... ${locationInfo}."
          
          Include all of these elements in a cohesive narrative:
          - Detailed role overview and key responsibilities
          - Required technical skills and experience
          - Day-to-day activities and projects
          - Team collaboration and reporting structure
          - Benefits, perks, and growth opportunities
          - Impact and contribution to company goals
          
          The paragraph should be engaging, detailed, and have no line breaks.
          Use natural transitions between topics to maintain flow.
          Write in an active, professional voice that attracts qualified candidates.
          Focus primarily on job requirements and responsibilities rather than company culture.
          
          Original content:
          ${content}
        `;

        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 800
        });

        const description = completion.choices[0].message.content
          .trim()
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ');

        // Update frontmatter
        data.description = description;
        const newContent = matter.stringify(content, data);
        await writeFile(filePath, newContent);
        
        console.log(`✅ Updated description for: ${file}`);
        console.log(`New description (${description.split(' ').length} words):\n${description}\n`);
        
        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 2000));
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

updateJobDescriptions(); 