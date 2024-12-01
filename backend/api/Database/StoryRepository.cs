using api.Models;
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

            const string query = "INSERT INTO storys (title, initial_text, author_id) VALUES (@title, @initial_text, @author_id)";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@title",story.Title);
            command.Parameters.AddWithValue("@initial_text",story.InitialText);
            command.Parameters.AddWithValue("@author_id",story.AuthorId);

            await command.ExecuteNonQueryAsync();
        }

        public IEnumerable<Story> GetAllByAuthorIdAsync(Guid authorId)
        {
            throw new NotImplementedException();
        }
    }
}
