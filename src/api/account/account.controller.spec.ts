// // src/__tests__/controllers/userController.test.ts
// import AccountController from './account.controller';
// import AccountService from '../../modules/account/account.service';
// import { Request, Response, NextFunction } from 'express';
// import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

// // Mock the AccountService
// let userServiceMock: DeepMockProxy<AccountService>;

// // Mock Express Request, Response, and NextFunction
// let mockRequest: Partial<Request>;
// let mockResponse: Partial<Response>;
// let mockNext: NextFunction;

// let userController: AccountController;

// beforeEach(() => {
//   // Reset mocks for each test
//   userServiceMock = mockDeep<AccountService>();
//   userController = new AccountController(userServiceMock);

//   // Define mock implementations for Express response methods
//   mockResponse = {
//     status: jest.fn().mockReturnThis(), // .status() is chainable
//     json: jest.fn(),
//   };
//   mockRequest = {}; // Initialize as empty, populate as needed per test
//   mockNext = jest.fn(); // Mock the next function
// });

// describe('AccountController', () => {
//   describe('getAllUsers', () => {
//     it('should return all users with 200 status', async () => {
//       const mockUsers = [{ id: '1', email: 'a@b.com' }, { id: '2', email: 'c@d.com' }];
//       userServiceMock.getAllUsers.mockResolvedValue(mockUsers); // Configure service mock

//       await userController.getAllUsers(mockRequest as Request, mockResponse as Response, mockNext);

//       expect(userServiceMock.getAllUsers).toHaveBeenCalledTimes(1); // Verify service method was called
//       expect(mockResponse.status).toHaveBeenCalledWith(200); // Verify status code
//       expect(mockResponse.json).toHaveBeenCalledWith(mockUsers); // Verify response JSON
//       expect(mockNext).not.toHaveBeenCalled(); // Ensure next was not called for a successful response
//     });

//     it('should call next with error if service fails', async () => {
//       const serviceError = new Error('Service failed to get users');
//       userServiceMock.getAllUsers.mockRejectedValue(serviceError); // Configure service mock to throw error

//       await userController.getAllUsers(mockRequest as Request, mockResponse as Response, mockNext);

//       expect(userServiceMock.getAllUsers).toHaveBeenCalledTimes(1);
//       expect(mockResponse.status).not.toHaveBeenCalled(); // Status should not be set by controller for error
//       expect(mockResponse.json).not.toHaveBeenCalled(); // JSON should not be sent by controller for error
//       expect(mockNext).toHaveBeenCalledWith(serviceError); // Error should be passed to next
//     });
//   });

//   describe('getUserById', () => {
//     it('should return a user with 200 status if found', async () => {
//       const mockUser = { id: '1', email: 'test@example.com' };
//       mockRequest.params = { id: '1' }; // Set request parameters
//       userServiceMock.getUserById.mockResolvedValue(mockUser);

//       await userController.getUserById(mockRequest as Request, mockResponse as Response, mockNext);

//       expect(userServiceMock.getUserById).toHaveBeenCalledWith('1');
//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
//     });

//     it('should return 404 if user not found', async () => {
//       mockRequest.params = { id: '999' };
//       userServiceMock.getUserById.mockResolvedValue(null);

//       await userController.getUserById(mockRequest as Request, mockResponse as Response, mockNext);

//       expect(userServiceMock.getUserById).toHaveBeenCalledWith('999');
//       expect(mockResponse.status).toHaveBeenCalledWith(404);
//       expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
//     });

//     it('should call next with error if service fails', async () => {
//       const serviceError = new Error('Database error');
//       mockRequest.params = { id: '1' };
//       userServiceMock.getUserById.mockRejectedValue(serviceError);

//       await userController.getUserById(mockRequest as Request, mockResponse as Response, mockNext);

//       expect(userServiceMock.getUserById).toHaveBeenCalledWith('1');
//       expect(mockNext).toHaveBeenCalledWith(serviceError);
//       expect(mockResponse.status).not.toHaveBeenCalled();
//     });
//   });

//   describe('uploadDocuments', () => {
//     it('should upload document and return 200', async () => {
//       mockRequest.params = { userId: 'user123' };
//       (mockRequest as any).file = { originalname: 'doc.pdf', buffer: Buffer.from('dummy') };
//       const mockUploadResult = { url: 'http://example.com/doc.pdf' };

//       userServiceMock.uploadUserDocument.mockResolvedValue(mockUploadResult);

//       await userController.uploadDocuments(mockRequest as Request, mockResponse as Response, mockNext);

//       expect(userServiceMock.uploadUserDocument).toHaveBeenCalledWith('user123', (mockRequest as any).file);
//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Document uploaded successfully', data: mockUploadResult });
//       expect(mockNext).not.toHaveBeenCalled();
//     });

//     it('should return 400 if no file is uploaded', async () => {
//       mockRequest.params = { userId: 'user123' };
//       (mockRequest as any).file = undefined; // No file in the request

//       await userController.uploadDocuments(mockRequest as Request, mockResponse as Response, mockNext);

//       expect(mockResponse.status).toHaveBeenCalledWith(400);
//       expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No file uploaded' });
//       expect(userServiceMock.uploadUserDocument).not.toHaveBeenCalled();
//       expect(mockNext).not.toHaveBeenCalled();
//     });

//     it('should return 404 if user not found during upload', async () => {
//       mockRequest.params = { userId: 'nonexistent' };
//       (mockRequest as any).file = { originalname: 'doc.pdf', buffer: Buffer.from('dummy') };

//       userServiceMock.uploadUserDocument.mockRejectedValue(new Error('User not found'));

//       await userController.uploadDocuments(mockRequest as Request, mockResponse as Response, mockNext);

//       expect(mockResponse.status).toHaveBeenCalledWith(404);
//       expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
//       expect(mockNext).not.toHaveBeenCalled();
//     });

//     it('should call next with other errors during upload', async () => {
//       mockRequest.params = { userId: 'user123' };
//       (mockRequest as any).file = { originalname: 'doc.pdf', buffer: Buffer.from('dummy') };
//       const serviceError = new Error('Storage service unavailable');

//       userServiceMock.uploadUserDocument.mockRejectedValue(serviceError);

//       await userController.uploadDocuments(mockRequest as Request, mockResponse as Response, mockNext);

//       expect(mockNext).toHaveBeenCalledWith(serviceError);
//       expect(mockResponse.status).not.toHaveBeenCalled();
//     });
//   });
// });