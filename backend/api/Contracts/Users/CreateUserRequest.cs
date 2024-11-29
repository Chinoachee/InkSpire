namespace api.Contracts.Users
{
    public record CreateUserRequest(string Login,string Password,string Email);
}
