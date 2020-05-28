using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using TodoFunctions.Configuration;
using System.Data.SqlClient;
using TodoFunctions.Models;
using Dapper;
using System.Linq;

namespace TodoFunctions
{
    public static class CreateTodoFunction
    {
        [FunctionName("CreateTodo")]
        public static async Task<Todo> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "todos")] HttpRequest request,
            ILogger logger)
        {
            await DatabaseConfiguration.EnsuresDatabaseCreated();

            var connectionString = Environment.GetEnvironmentVariable("ConnectionString");
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string requestBody = await new StreamReader(request.Body).ReadToEndAsync();
                var todo = JsonConvert.DeserializeObject<Todo>(requestBody);

                string query = @"
INSERT INTO [dbo].[Todos]
([Content], [IsDeleted])
VALUES
(@Content, 0)

SELECT *
FROM [dbo].[Todos]
WHERE [Id] = SCOPE_IDENTITY()
";

                return (await connection.QueryAsync<Todo>(query, todo)).Single();
            }
        }
    }
}
