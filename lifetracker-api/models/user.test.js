// "use strict"

// const { NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors")
// const User = require("./user")
// const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/models/common")

// beforeAll(commonBeforeAll)
// beforeEach(commonBeforeEach)
// afterEach(commonAfterEach)
// afterAll(commonAfterAll)

// /************************************** authenticate */

// describe("authenticate", function () {
//   test("user can authenticate successfully", async function () {
//     const user = await User.authenticate({ email: "lebron@james.io", password: "password" })

//     expect(user).toEqual({
//       username: "lebron",
//       firstName: "Lebron",
//       lastName: "James",
//       email: "lebron@james.io",
//       isAdmin: false,
//     })
//   })
//   test("unauth if no such user", async function () {
//     expect.assertions(1)

//     try {
//       await User.authenticate({ email: "somebody@else.io", password: "password" })
//     } catch (err) {
//       expect(err instanceof UnauthorizedError).toBeTruthy()
//     }
//   })
//   test("unauth if wrong password", async function () {
//     expect.assertions(1)

//     try {
//       await User.authenticate({ email: "lebron@james.io", password: "wrong" })
//     } catch (err) {
//       expect(err instanceof UnauthorizedError).toBeTruthy()
//     }
//   })
// })

// /************************************** register */

// describe("register", function () {
//   const newUser = {
//     username: "new",
//     firstName: "Test",
//     lastName: "Tester",
//     email: "test@test.io",
//     isAdmin: false,
//   }
//   test("can successfully register user", async function () {
//     const user = await User.register({ ...newUser, password: "password" })
//     expect(newUser.firstName).toEqual(user.firstName)
//     expect(newUser.lastName).toEqual(user.lastName)
//     expect(newUser.email).toEqual(user.email)
//   })

//   test("bad request with dup data", async function () {
//     expect.assertions(1)

//     try {
//       await User.register({
//         ...newUser,
//         password: "password",
//       })
//       await User.register({
//         ...newUser,
//         password: "password",
//       })
//     } catch (err) {
//       expect(err instanceof BadRequestError).toBeTruthy()
//     }
//   })
// })

// /************************************** get */

// describe("get", function () {
//   test("can fetch a user by username", async function () {
//     const user = await User.get("lebron")
//     expect(user).toEqual({
//       username: "lebron",
//       firstName: "Lebron",
//       lastName: "James",
//       email: "lebron@james.io",
//       isAdmin: false,
//     })
//   })
//   test("not found if no such user", async function () {
//     expect.assertions(1)

//     try {
//       await User.get("nope")
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy()
//     }
//   })
// })
"use strict";

const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const User = require("./user");

/************************************** authenticate */

describe("User.authenticate", function () {
  test("should authenticate a user successfully", async function () {
    // Create a user for testing
    const user = await User.register({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "password",
      location: "New York",
      date: "2023-06-27",
    });

    // Authenticate the user
    const authenticatedUser = await User.authenticate({
      email: "johndoe@example.com",
      password: "password",
    });

    // Assert the authentication result
    expect(authenticatedUser).toEqual({
      id: user.id,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      location: "New York",
      date: "2023-06-27",
    });
  });

  test("should throw UnauthorizedError if user is not found", async function () {
    expect.assertions(1);

    try {
      await User.authenticate({
        email: "nonexistent@example.com",
        password: "password",
      });
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("should throw UnauthorizedError if password is incorrect", async function () {
    expect.assertions(1);

    // Create a user for testing
    await User.register({
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      password: "password",
      location: "London",
      date: "2023-06-27",
    });

    try {
      await User.authenticate({
        email: "janesmith@example.com",
        password: "wrongpassword",
      });
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("User.register", function () {
  test("should register a user successfully", async function () {
    const newUser = {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alicejohnson@example.com",
      password: "password",
      location: "Los Angeles",
      date: "2023-06-27",
    };

    const registeredUser = await User.register(newUser);

    expect(registeredUser).toEqual({
      id: expect.any(Number),
      firstName: "Alice",
      lastName: "Johnson",
      email: "alicejohnson@example.com",
      location: "Los Angeles",
      date: "2023-06-27",
    });
  });

  test("should throw BadRequestError if email is duplicate", async function () {
    expect.assertions(1);

    // Register a user with the same email twice
    await User.register({
      firstName: "Bob",
      lastName: "Smith",
      email: "bobsmith@example.com",
      password: "password",
      location: "San Francisco",
      date: "2023-06-27",
    });

    try {
      await User.register({
        firstName: "Charlie",
        lastName: "Brown",
        email: "bobsmith@example.com",
        password: "password",
        location: "Seattle",
        date: "2023-06-27",
      });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
