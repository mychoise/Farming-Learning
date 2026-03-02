import { varchar } from "drizzle-orm/pg-core";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const animalCalculate = pgTable("animalCalculate",{
    id: uuid("id").primaryKey().defaultRandom(),
    name:varchar("name", { length: 255 }).notNull(),
    constant:varchar("constant", { length: 255 }).notNull(),
})
