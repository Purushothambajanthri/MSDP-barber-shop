import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table - Required for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - Required for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Barbers table
export const barbers = pgTable("barbers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  experience: integer("experience").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  specialties: text("specialties").array().notNull(),
  description: text("description").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Chairs table
export const chairs = pgTable("chairs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  barberId: integer("barber_id").notNull().references(() => barbers.id),
  chairId: integer("chair_id").notNull().references(() => chairs.id),
  bookingDate: timestamp("booking_date").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
  status: varchar("status", { length: 50 }).default("confirmed"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Booking services junction table
export const bookingServices = pgTable("booking_services", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull().references(() => bookings.id, { onDelete: "cascade" }),
  serviceId: integer("service_id").notNull().references(() => services.id),
  quantity: integer("quantity").default(1),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const barbersRelations = relations(barbers, ({ many }) => ({
  bookings: many(bookings),
}));

export const chairsRelations = relations(chairs, ({ many }) => ({
  bookings: many(bookings),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  bookingServices: many(bookingServices),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  barber: one(barbers, {
    fields: [bookings.barberId],
    references: [barbers.id],
  }),
  chair: one(chairs, {
    fields: [bookings.chairId],
    references: [chairs.id],
  }),
  bookingServices: many(bookingServices),
}));

export const bookingServicesRelations = relations(bookingServices, ({ one }) => ({
  booking: one(bookings, {
    fields: [bookingServices.bookingId],
    references: [bookings.id],
  }),
  service: one(services, {
    fields: [bookingServices.serviceId],
    references: [services.id],
  }),
}));

// Schema for inserts
export const insertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertBarberSchema = createInsertSchema(barbers).omit({
  id: true,
  createdAt: true,
});

export const insertChairSchema = createInsertSchema(chairs).omit({
  id: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBookingServiceSchema = createInsertSchema(bookingServices).omit({
  id: true,
});

// Types
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Barber = typeof barbers.$inferSelect;
export type Chair = typeof chairs.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type BookingService = typeof bookingServices.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertBookingService = z.infer<typeof insertBookingServiceSchema>;
