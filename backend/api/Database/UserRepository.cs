using api.Models.Users;
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
        public async Task<User?> GetByEmailAsync(string email)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            const string query = "SELECT id, login, hash_password FROM users WHERE email = @email";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@email", email);

            using var reader = await command.ExecuteReaderAsync();
            if (reader.Read())
            {
                Guid id = reader.GetGuid(0);
                string login = reader.GetString(1);
                string hashPassword = reader.GetString(2);
                return new User()
                {
                    Id = id,
                    Login = login,
                    Email = email,
                    HashPassword = hashPassword
                };
            }
            return null;
        }
        // Потом поменять логику того что мы забираем от пользователя
        public async Task<User?> GetByLoginAsync(string login)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            const string query = "SELECT * FROM users WHERE login = @login";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@login", login);
            using var reader = await command.ExecuteReaderAsync();
            if (reader.Read())
            {
                return new User()
                {
                    Id = reader.GetGuid(0),
                    Login = reader.GetString(1),
                    Email = reader.GetString(3)
                };
            }
            return null;
        }
    }
}
