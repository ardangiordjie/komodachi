// Initialize database schema in production
const { execSync } = require('child_process');

console.log('🔧 Initializing database schema...');

try {
  execSync('npx prisma db push --skip-generate --accept-data-loss', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: process.env.DIRECT_URL || process.env.DATABASE_URL
    }
  });
  console.log('✅ Database schema created successfully!');
} catch (error) {
  console.error('❌ Error creating schema:', error.message);
  process.exit(1);
}

