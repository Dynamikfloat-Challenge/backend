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

/**
 * Get a dev by ID.
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns the dev object or an error message
 */
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

/**
 * Get devs by search terms.
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns the list of devs matching the search terms or an error message
 */
export const getDevsByTerms = async (req, res) => {
  try {
    const terms = req.query.terms;
    if (!terms || terms.length === 0) {
      return res
        .status(400)
        .json({ error: "Terms query parameter is required" });
    }
    const users = await sql`
        SELECT * FROM devs
        WHERE name ILIKE ${`%${terms}%`} OR
        nickname ILIKE ${`%${terms}%`} OR
        EXISTS (
            SELECT 1 FROM unnest(stack) AS tech
            WHERE tech ILIKE ${`%${terms}%`})
        `;
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createDev = async (req, res) => {
  const { name, nickname, stack, birth_date } = req.body;

  if (!name || !nickname) {
    return res.status(422).json({ error: "Name and nickname are required" });
  }
  if( typeof(name) !== 'string' || typeof(nickname) !== 'string') {
    return res.status(400).json({ error: "Name and nickname must be strings" });
  }
  if(!Array.isArray(stack) || !stack.every(item => typeof item === 'string')) {
    return res.status(400).json({ error: "Stack must be an array of strings" });
  }

  try {
    const foundDev = await sql`
        SELECT * FROM devs WHERE nickname = ${nickname}`;
    if (foundDev.length > 0) {
      return res
        .status(422)
        .json({ error: "Dev with this nickname already exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }


  try {
    const newDev = await sql`
      INSERT INTO devs (name, nickname, stack, birth_date)
      VALUES (${name}, ${nickname}, ${stack}, ${birth_date})
      RETURNING *`;
    return res.status(201).json(newDev[0]);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
