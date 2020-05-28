### Local development

In order to develop locally, you have to follow these steps:

1. Create the file `local.settings.json` in this folder:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "ConnectionString": "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TodosDatabase;Integrated Security=True;Pooling=False"
  },
  "Host": {
    "CORS": "*"
  }
}
```

2. Create a local database named `TodosDatabase` inside `(localdb)\\MSSQLLocalDB`