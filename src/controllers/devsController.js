import sql from '../config/database.js';

/**
 * Get all devs from the database.
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns list of devs or an error message
 * @throws {Error} if there is an issue with the database query
 */

export const getDevs = async(req, res) => {
    try {
       const data  = await sql`SELECT * FROM devs`;       
       return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
