using api.Models;
using Npgsql;

namespace api.Database
{
    public class UserRepository(string connectionString) : IUserRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task AddAsync(User user)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            const string query = "INSERT INTO users (login, hash_password, email) VALUES (@login, @hash_password, @email);";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@login", user.Login);
            command.Parameters.AddWithValue("@hash_password", user.HashPassword);
            command.Parameters.AddWithValue("@email", user.Email);

            await command.ExecuteNonQueryAsync();
        }
        public async Task<bool> GetByEmailAsync(string email)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            const string query = "SELECT COUNT(*) FROM users WHERE email = @email";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@email", email);
            var result = await command.ExecuteScalarAsync();
            return Convert.ToInt32(result) > 0;
        }
    }
}
