#!/usr/bin/env node

/**
 * Migration script to update portfolio site content from resume-customizer data
 * 
 * Reads experience, projects, and skills from resume-customizer and transforms
 * them into the format expected by the portfolio Vue components.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const RESUME_CUSTOMIZER_BASE = join(__dirname, '../../resume-customizer/input/profiles/sections');
const PORTFOLIO_CONFIG = join(__dirname, '../src/config/joeInfo.json');

/**
 * Normalize company name for logo lookup
 */
function normalizeCompanyName(company) {
  if (!company) return 'js';
  
  const normalized = company
    .toLowerCase()
    .replace(/[·•,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Handle specific company mappings
  if (normalized.includes('fora')) return 'fora';
  if (normalized.includes('icims')) return 'icims';
  if (normalized.includes('jibe')) return 'jibe';
  if (normalized.includes('marvel')) return 'marvel';
  if (normalized.includes('rutgers')) return 'rutgers';
  if (normalized.includes('scrollmotion')) return 'scrollmotion';
  if (normalized.includes('sesame')) return 'sesame';
  if (normalized.includes('vendome')) return 'vendome';
  
  return 'js'; // Default fallback
}

/**
 * Map personal project names to specific logos
 */
function getPersonalProjectLogo(projectName) {
  const name = projectName.toLowerCase();
  
  if (name.includes('joesangiorgio.com')) return 'js';
  if (name.includes('home automation')) return 'homeassistant';
  if (name.includes('ratethat truck')) return 'rtt';
  
  return 'js'; // Default for other personal projects
}

/**
 * Transform experience data
 */
function transformExperience(experienceData) {
  return experienceData.map(exp => {
    const logo = normalizeCompanyName(exp.company);
    
    return {
      company: exp.company,
      title: exp.title,
      timeFrame: exp.duration,
      logo: logo,
      description: exp.description
    };
  });
}

/**
 * Transform projects data
 */
function transformProjects(projectsData) {
  return projectsData.map(proj => {
    let logo;
    
    if (proj.company === 'Personal') {
      logo = getPersonalProjectLogo(proj.name);
    } else {
      logo = normalizeCompanyName(proj.company);
    }
    
    return {
      title: proj.name,
      company: proj.company,
      logo: logo,
      description: proj.description
    };
  });
}

/**
 * Transform skills data
 */
function transformSkills(skillsData) {
  // Extract skill names and sort by endorsements (descending)
  return skillsData.skills
    .sort((a, b) => b.endorsements - a.endorsements)
    .map(skill => skill.name);
}

/**
 * Transform references/recommendations data
 */
function transformReferences(recommendationsData) {
  // Use "received" recommendations (recommendations about Joe)
  return recommendationsData.received.map(rec => {
    // Split date field which contains both date and relationship
    // Format: "September 9, 2024, Matthew reported directly to Joe"
    const dateParts = rec.date.split(',').map(part => part.trim());
    
    // First two parts are the date (e.g., "September 9" and "2024")
    const date = dateParts.length >= 2 ? `${dateParts[0]}, ${dateParts[1]}` : dateParts[0];
    // Everything after is the relationship
    const relationship = dateParts.length > 2 ? dateParts.slice(2).join(', ') : '';
    
    return {
      name: rec.recommender_name,
      title: rec.recommender_title_company,
      date: date,
      relationship: relationship,
      img: '../src/assets/pics/placeholder.svg',
      body: rec.text
    };
  });
}

/**
 * Main migration function
 */
function migrate() {
  console.log('🔄 Starting content migration from resume-customizer to portfolio...\n');
  
  try {
    // Read source data
    console.log('📖 Reading source data...');
    const experienceData = JSON.parse(
      readFileSync(join(RESUME_CUSTOMIZER_BASE, 'experience.json'), 'utf-8')
    );
    const projectsData = JSON.parse(
      readFileSync(join(RESUME_CUSTOMIZER_BASE, 'projects.json'), 'utf-8')
    );
    const skillsData = JSON.parse(
      readFileSync(join(RESUME_CUSTOMIZER_BASE, 'skills.json'), 'utf-8')
    );
    const recommendationsData = JSON.parse(
      readFileSync(join(RESUME_CUSTOMIZER_BASE, 'recommendations.json'), 'utf-8')
    );
    
    console.log(`  ✓ Found ${experienceData.length} experience entries`);
    console.log(`  ✓ Found ${projectsData.length} project entries`);
    console.log(`  ✓ Found ${skillsData.skills.length} skills`);
    console.log(`  ✓ Found ${recommendationsData.received.length} recommendations\n`);
    
    // Transform data
    console.log('🔧 Transforming data structures...');
    const transformedExperience = transformExperience(experienceData);
    const transformedProjects = transformProjects(projectsData);
    const transformedSkills = transformSkills(skillsData);
    const transformedReferences = transformReferences(recommendationsData);
    
    console.log(`  ✓ Transformed ${transformedExperience.length} experience entries`);
    console.log(`  ✓ Transformed ${transformedProjects.length} project entries`);
    console.log(`  ✓ Transformed ${transformedSkills.length} skills`);
    console.log(`  ✓ Transformed ${transformedReferences.length} references\n`);
    
    // Collect unique logos needed
    const logosNeeded = new Set();
    transformedExperience.forEach(exp => logosNeeded.add(exp.logo));
    transformedProjects.forEach(proj => logosNeeded.add(proj.logo));
    
    // Check for missing logos
    const existingLogos = ['marvel', 'rutgers', 'scrollmotion', 'js', 'homeassistant', 'rtt', 'sesame', 'vendome'];
    const missingLogos = [...logosNeeded].filter(logo => !existingLogos.includes(logo));
    
    if (missingLogos.length > 0) {
      console.log('⚠️  Missing logos (need to be added to src/assets/logos/):');
      missingLogos.forEach(logo => {
        console.log(`  - ${logo}.png`);
      });
      console.log();
    }
    
    // Create new data structure
    const newData = {
      profileData: {
        experience: transformedExperience,
        projects: transformedProjects,
        skills: transformedSkills,
        references: transformedReferences
      }
    };
    
    // Write to portfolio config
    console.log('💾 Writing updated data to portfolio config...');
    writeFileSync(PORTFOLIO_CONFIG, JSON.stringify(newData, null, 2), 'utf-8');
    console.log(`  ✓ Updated ${PORTFOLIO_CONFIG}\n`);
    
    // Summary
    console.log('✅ Migration complete!');
    console.log('\n📊 Summary:');
    console.log(`  - Experience entries: ${transformedExperience.length}`);
    console.log(`  - Project entries: ${transformedProjects.length}`);
    console.log(`  - Skills: ${transformedSkills.length}`);
    console.log(`  - References: ${transformedReferences.length}`);
    
    if (missingLogos.length > 0) {
      console.log(`\n⚠️  Next step: Add ${missingLogos.length} missing logo(s) to src/assets/logos/`);
    } else {
      console.log('\n✅ All logos are available!');
    }
    
    console.log('\n🧪 Test the portfolio locally with: npm run dev');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
migrate();

