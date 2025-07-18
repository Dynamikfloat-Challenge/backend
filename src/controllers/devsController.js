import sql from "../config/database.js";

/**
 * Get all devs from the database.
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns list of devs or an error message
 * @throws {Error} if there is an issue with the database query
 */

export const getDevs = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM devs`;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDevById = async (req, res) => {
  try {
    const user = await sql`SELECT * FROM devs WHERE id = ${req.params.id}`;
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user[0]);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
