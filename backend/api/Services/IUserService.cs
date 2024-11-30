﻿using api.Contracts.Users;

namespace api.Services
{
    public interface IUserService
    {
        Task CreateUser(CreateUserRequest request);
        Task<string> AuthorizeUser(AuthorizationUserRequest request);
    }
}
