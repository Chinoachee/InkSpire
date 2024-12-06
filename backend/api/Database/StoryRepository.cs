using api.Models.Stories;
using Npgsql;

namespace api.Database
{
    public class StoryRepository(string connectionString) : IStoryRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task AddAsync(Story story)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            const string query = "INSERT INTO stories (title, initial_text, author_id) VALUES (@title, @initial_text, @author_id)";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@title",story.Title);
            command.Parameters.AddWithValue("@initial_text",story.InitialText);
            command.Parameters.AddWithValue("@author_id",story.AuthorId);

            await command.ExecuteNonQueryAsync();
        }

        public async Task<IEnumerable<Story>> GetAllByAuthorIdAsync(Guid authorId)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            const string query = "SELECT * FROM stories WHERE author_id = @authorId";
            
            using var command = new NpgsqlCommand(query,connection);
            command.Parameters.AddWithValue("@authorId",authorId);

            using var reader = await command.ExecuteReaderAsync();
            var result = new List<Story>();
            while (await reader.ReadAsync())
            {
                result.Add(new Story() {
                    Id = reader.GetGuid(0),
                    Title = reader.GetString(1),
                });
            }
            return result;
        }

        public async Task<Story?> GetStoryById(Guid id)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            const string query = "SELECT * FROM stories WHERE id = @Id";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@id", id);

            using var reader = await command.ExecuteReaderAsync();
            Story? result = null;
            if (await reader.ReadAsync())
            {
                result = new Story()
                {
                    Id = reader.GetGuid(0),
                    Title = reader.GetString(1),
                    InitialText = reader.GetString(2),
                    AuthorId = reader.GetGuid(3)
                };
            }
            return result;
        }
    }
}
