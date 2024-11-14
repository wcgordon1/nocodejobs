# Component Copying Instructions

When creating new routes from existing components:

1. Create new components with prefix 'Platform':
   - PlatformEntries.astro (from Entries.astro)
   - PlatformSearch.astro (from SearchJobs.astro)

2. Never modify:
   - Original styling
   - Class names
   - Component structure
   - Existing functionality

3. Only change:
   - Component names
   - Import paths
   - Data filtering logic
   - Route-specific content

4. File locations:
   /src/components/platforms/
   ├── PlatformEntries.astro
   └── PlatformSearch.astro

5. Keep all Tailwind classes identical 

More details

Here's a detailed plan for creating platform-specific job pages:
File Structure:
)
URL Structure Examples:
jobs
Implementation Steps:
A. Create Dynamic Route:
Create [platform]-jobs.astro that captures platform parameter
Strip "-jobs" from URL to match against occupationalCategory
Filter jobs where occupationalCategory includes platform name
B. Create Platform Components:
Copy and simplify SearchJobs.astro → PlatformSearch.astro
Copy and simplify Entries.astro → PlatformEntries.astro
Remove filter-related code and keep only search functionality
C. Data Flow:
;
4. SEO Considerations:
Dynamic titles: "{Platform} Developer Jobs"
Dynamic descriptions
Platform-specific structured data
Component Modifications:
Simplified search (no filters)
Same job card design
Keep sorting by featured/date
Error Handling:
Handle no jobs found for platform
Handle invalid platform names
Redirect invalid URLs
