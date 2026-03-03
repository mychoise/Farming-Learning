import { db } from "../db.config.js";
import { userTable } from "../db/schema/user.js"; // ✅ correct import
import { eq } from "drizzle-orm";

export const admin = async (req, res, next) => {
  try {
    console.log("req.user", req.user.id);
    const { id: userId } = req.user;

    const [user] = await db
      .select({ role: userTable.role }) // ✅ correct column
      .from(userTable)
      .where(eq(userTable.id, userId));

    if (!user) {
      // ✅ handle not found
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("error in admin middleware", error.message); // ✅ try/catch
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
