const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const jobsDir = path.resolve(__dirname, '../src/content/jobs');

// Get all job files
const jobFiles = fs.readdirSync(jobsDir).filter(file => file.endsWith('.md'));

// Generate unique dates across the last 2 days
function generateUniqueDates(numberOfJobs) {
  const dates = [];
  const now = new Date();
  const twoDaysAgo = new Date(now - 2 * 24 * 60 * 60 * 1000); // 2 days ago
  
  // Calculate time interval to spread jobs evenly
  const timeInterval = (now.getTime() - twoDaysAgo.getTime()) / numberOfJobs;
  
  for (let i = 0; i < numberOfJobs; i++) {
    const date = new Date(now.getTime() - (i * timeInterval));
    dates.push(date);
  }
  
  // Shuffle the dates to randomize them
  return dates.sort(() => Math.random() - 0.5);
}

const uniqueDates = generateUniqueDates(jobFiles.length);

// Process each job file
jobFiles.forEach((file, index) => {
  const filePath = path.join(jobsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const doc = matter(content);
  
  // Assign a unique date from our generated dates
  const datePosted = uniqueDates[index];
  
  // Calculate validThrough (60 days after datePosted)
  const validThrough = new Date(datePosted);
  validThrough.setDate(validThrough.getDate() + 60);
  
  // Update the frontmatter using template literals
  doc.data.datePosted = `${datePosted.toISOString().split('.')[0]}Z`;
  doc.data.validThrough = `${validThrough.toISOString().split('.')[0]}Z`;
  
  // Write back to file
  const updatedContent = matter.stringify(doc.content, doc.data);
  fs.writeFileSync(filePath, updatedContent);
  
  console.log(`Updated ${file}:`);
  console.log(`  datePosted: ${doc.data.datePosted}`);
  console.log(`  validThrough: ${doc.data.validThrough}`);
});

console.log(`\nUpdated ${jobFiles.length} job files`);