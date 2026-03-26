import { pgTable, serial, varchar, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: text('password').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
});

export const bugs = pgTable('bugs', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    priority: varchar('priority', { length: 50 }).notNull(),
    severity: varchar('severity', { length: 50 }).notNull(),
    status: varchar('status', { length: 50 }).default('Open'),
    assignee: varchar('assignee', { length: 255 }),
    date: varchar('date', { length: 255 }).notNull(),
});
