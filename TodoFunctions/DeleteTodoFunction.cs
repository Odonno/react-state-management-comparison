using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using TodoFunctions.Configuration;
using System.Data.SqlClient;
using Dapper;

namespace TodoFunctions
{
    public static class DeleteTodoFunction
    {
        [FunctionName("DeleteTodo")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "todos/{id}")] HttpRequest request,
            string id,
            ILogger logger)
        {
            await DatabaseConfiguration.EnsuresDatabaseCreated();

            if (!int.TryParse(id, out int valueId))
            {
                return new BadRequestObjectResult("Please pass a valid id on the query string");
            }

            var connectionString = Environment.GetEnvironmentVariable("ConnectionString");
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string query = @"
UPDATE [dbo].[Todos]
SET [IsDeleted] = 1
WHERE [Id] = @Id
";

                await connection.ExecuteAsync(query, new { Id = valueId });
            }

            return (ActionResult)new OkObjectResult($"Todo #{id} removed");
        }
    }
}
