process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL = 'file:./test.db';

const { prisma } = require('../src/config/prisma') as typeof import('../src/config/prisma');
const { DEFAULT_CATEGORIES } = require('../src/shared/constants/financial') as typeof import('../src/shared/constants/financial');

const statements = [
  `CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "monthlyIncome" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
  )`,
  'CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")',
  `CREATE TABLE IF NOT EXISTS "Budget" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "monthlyIncome" DECIMAL NOT NULL,
    "investmentPercentage" DECIMAL NOT NULL,
    "fixedExpenses" DECIMAL NOT NULL,
    "health" DECIMAL NOT NULL,
    "education" DECIMAL NOT NULL,
    "leisure" DECIMAL NOT NULL,
    "freeReserve" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  'CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category"("name")',
  `CREATE TABLE IF NOT EXISTS "Expense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS "InvestmentPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "investmentPercentage" DECIMAL NOT NULL,
    "goal" TEXT NOT NULL,
    "months" INTEGER NOT NULL,
    "profile" TEXT NOT NULL,
    "monthlyRecommendedAmount" DECIMAL NOT NULL,
    "projectedTotalWithoutInterest" DECIMAL NOT NULL,
    "incomeCommitmentPercentage" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InvestmentPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
];

beforeAll(async () => {
  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement);
  }
});

beforeEach(async () => {
  await prisma.investmentPlan.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  await Promise.all(
    DEFAULT_CATEGORIES.map((name) =>
      prisma.category.create({
        data: { name },
      }),
    ),
  );
});

afterAll(async () => {
  await prisma.$disconnect();
});
