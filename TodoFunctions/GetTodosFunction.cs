using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using TodoFunctions.Models;
using Dapper;
using System.Collections.Generic;
using TodoFunctions.Configuration;

namespace TodoFunctions
{
    public static class GetTodosFunction
    {
        [FunctionName("GetTodos")]
        public static async Task<IEnumerable<Todo>> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "todos")] HttpRequest request,
            ILogger logger)
        {
            await DatabaseConfiguration.EnsuresDatabaseCreated();

            var connectionString = Environment.GetEnvironmentVariable("ConnectionString");
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string query = @"
SELECT *
FROM [dbo].[Todos]
WHERE [IsDeleted] = 0
";

                return await connection.QueryAsync<Todo>(query);
            }
        }
    }
}
