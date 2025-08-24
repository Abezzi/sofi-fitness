import { eq } from "drizzle-orm";
import { Category, category } from "../schema";
import { db } from "..";

export async function postCategory(categoryToPost: Category) {
  try {
    await db.insert(category).values({
      name: categoryToPost.name,
      color: categoryToPost.color,
    });
  } catch (error) {
    console.log(error);
  }
}
