const getFibbonaciSum = (n: number): number => {
  if (n == 1) return 0;
  if (n == 2) {
    return 1;
  } else {
    return getFibbonaciSum(n - 1) + getFibbonaciSum(n - 2);
  }
};

import AuthController from "./auth.controller";
import AuthService from "../../modules/auth/auth.service";
import { BasicLoginRequestDTO } from "./dtos/request.dto";
import getDefaultConfig from "../../config/config";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { DependencyManager } from "../../classes/dep_manager";
import { Request, Response, NextFunction } from "express";
import { BasicLoginResponseDTO } from "./dtos/response.dto";
import { Roles } from "../../types/utilTypes";

// Migrating of mixing jsx to tsx  - using types in your tsx files
// updating outdated libraries
// page based approach in organizing your components/ in components folder we create a folder called page, then a folder for common
// We need to write test
// we need to add monitoring and code optimization - time for fcp takes too long first contentful paint
// importing pages dynamically
// seperation and isolation of environments
//
// describe("Test for the fibonnaci sequence series", () => {
//   it("Test fibonnaci series of 5", () => {
//     const expectedResult = 3;

//     expect(getFibbonaciSum(5)).toBe(expectedResult);
//   });

//   it("Test fibonnaci series of 7", () => {
//     const expectedResult = 8;

//     expect(getFibbonaciSum(7)).toBe(expectedResult);
//   });

//   it("Test fibonnaci series of 9", () => {
//     const expectedResult = 21;
//     expect(getFibbonaciSum(9)).toBe(expectedResult);
//   });

// });
let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let mockNext: Partial<NextFunction>;
let authController: AuthController;
let depMan: InstanceType<typeof DependencyManager>;

// let authServiceMock: DeepMockProxy<AuthService>;
beforeEach(async () => {
  // basically we are to trying to test the login controller now
  // Arrange variables, act, asset
  // we need to an authservice that will be mocked to create a controller, so we perform that through dependency injection
  // the parameters for the login then includes a request, a response and a next function

  // authServiceMock = mockDeep<AuthService>();

  depMan = await DependencyManager.getInstance(getDefaultConfig());
  authController = new AuthController(depMan.getService<AuthService>("auth"));
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
  };
  mockRequest = {
    body: {},
  };
  mockNext = jest.fn(); 
});

describe("user login test", () => {
  it("should return with a 200 as the status code and a User data without the hashed_password as the json response when a the right details are inputed", async () => {
    const userDetails: BasicLoginRequestDTO = {
      email: "abrahamodusegun36@gmail.com",
      password: "Maximus108",
    };

    mockRequest.body = { ...userDetails };

    const authService = depMan.getService<AuthService>("auth");

    let mockJsonResult: Partial<
      Awaited<ReturnType<typeof authService.loginUser>>
    >;

    mockJsonResult = {
      id: 1,
      email: "abrahamodusegun36@gmail.com",
      username: "Brahmsz",
      email_verified: false,
      picture: null,
      phone_number: "09013908081",
      role: "ADMIN",
      createdAt: new Date("2025-07-07T12:55:13.137Z"),
      updatedAt: new Date("2025-07-11T11:19:22.544Z"),
    };

    await authController.login(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    const { refresh_token, ...mockApiResponse } = mockJsonResult;
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining(mockApiResponse)
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return with a 400 status code and message that shows some type of validation failed for email missing", async () => {
    const reqBody = {
      password: "indomie",
    };

    mockRequest.body = { ...reqBody };

    const jsonResponse = {
      message: ["Email is required"],
    };

    // we are not mocking any service because we belive that the function should have returned before calling any service
    await authController.login(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(jsonResponse);
  });
});
