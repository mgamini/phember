use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :phxbuild, Phxbuild.Endpoint,
  secret_key_base: "xehylPg/AoIW3CCleL1FP51WTog95HldGh7ZCicQGCSC9IT9TzEhCfcJCi0mCYxg"

# Configure your database
config :phxbuild, Phxbuild.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "phxbuild_prod"
