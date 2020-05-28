using Dapper;
using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace TodoFunctions.Configuration
{
    public static class DatabaseConfiguration
    {
        public static async Task EnsuresDatabaseCreated()
        {
            var connectionString = Environment.GetEnvironmentVariable("ConnectionString");
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string query = @"
IF NOT EXISTS (SELECT * FROM sysobjects WHERE [Name] = 'Todos' AND [xtype] = 'U')
    CREATE TABLE [dbo].[Todos] (
        [Id] INT PRIMARY KEY IDENTITY(1, 1),
        [Content] NVARCHAR(500) NOT NULL,
        [IsDeleted] BIT NOT NULL
    )
";

                await connection.ExecuteAsync(query);
            }
        }
    }
}
