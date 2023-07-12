"use strict"
const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publicly.
   * Don't show user's password
   *
   * @param {User} user - user from the database
   * @returns public user
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    };
  }

  /**
   * Authenticate user with email and password.
   * Throws UnauthorizedError if the user is not found or the password is incorrect.
   *
   * @returns user
   **/
  static async authenticate(creds) {
    const { email, password } = creds;

    const user = await User.fetchUserByEmail(email);

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        return User._createPublicUser(user);
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /**
   * Register user with data.
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/
  static async register(creds) {
    const { email, password, firstName, lastName } = creds;

    const existingUserWithEmail = await User.fetchUserByEmail(email);
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const normalizedEmail = email.toLowerCase();

    const result = await db.query(
      `INSERT INTO users (
          password,
          first_name,
          last_name,
          email
        )
        VALUES ($1, $2, $3, $4)
        RETURNING email, first_name AS "firstName", last_name AS "lastName", id` ,
      [hashedPassword, firstName, lastName, normalizedEmail]
    );
        
    const user = result.rows[0];

    return User._createPublicUser(user);
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT *
           FROM users
           WHERE email = $1`,
      [email.toLowerCase()]
    );

    const user = result.rows[0];

    console.log("USER: ", user)

    return user;
  }

  /**
   * Fetch a user in the database by user ID
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT *
           FROM users
           WHERE id = $1`,
      [userId]
    );

    const user = result.rows[0];

    return user;
  }

  static async addExercise(info) {
    const { exerciseName, exerciseType, duration, intensity, userId } = info;
  
    // Add exercise to the database
    const result = await db.query(
      `INSERT INTO exercises (exercise_name, exercise_type, duration, intensity, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING exercise_name, exercise_type, duration, intensity, user_id`,
      [exerciseName, exerciseType, duration, intensity, userId]
    );
  
    const exercise = result.rows[0];
  
    return exercise;
  }
  
  static async getExercisesByUserId(userId) {
    // Retrieve exercises from the database based on user_id
    console.log('model userid', userId)
    const result = await db.query(
      `SELECT exercise_name AS "exerciseName", exercise_type AS "exerciseType", duration, intensity, created_at FROM exercises WHERE user_id = $1`,
      [userId]
    );
  
    const exercises = result.rows;
    console.log("models", exercises)
    return exercises;

  }
  
  
}

module.exports = User;

