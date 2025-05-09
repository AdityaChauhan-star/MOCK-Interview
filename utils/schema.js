import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDesc: varchar('jobDesc').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt'),
  mockId: varchar('mockId').notNull()
});

export const UserAnswer = pgTable('userAnswer', {
  id: serial('id').primaryKey(),
  mockIdRef: varchar('mockIdRef').notNull(), // Fixed field name
  question: varchar('question').notNull(),
  correctAns: text('correctAns'),
  userAns: text('userAns'), // Fixed field name
  feedback: text('feedback'),
  rating: varchar('rating'), // Corrected type
  createdAt: varchar('createdAt'),
});

export const schema = { MockInterview, UserAnswer };
