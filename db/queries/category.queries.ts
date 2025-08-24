import { eq } from "drizzle-orm";
import { Category, category } from "../schema";
import { db } from "..";

/**
 * @param dbRecord - record from the db
 * @returns Category
 */
export function transformDbToCategory(dbRecord: any): Category {
  return {
    id: dbRecord.id,
    name: dbRecord.name,
    color: dbRecord.color,
  };
}

/**
 * @param  categoryToPost- category object you want to instert into the category db
 * @returns Category
 */
export async function postCategory(categoryToPost: Category): Promise<boolean> {
  try {
    await db.insert(category).values({
      name: categoryToPost.name,
      color: categoryToPost.color,
    });
    return true;
  } catch (error) {
    console.log(error);
    throw false;
  }
}

/**
 * @returns Category[] || error
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const result = await db.select().from(category);

    if (result.length === 0) {
      return [];
    }

    return result.map(transformDbToCategory);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
