use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :phember, Phember.Endpoint,
  secret_key_base: "wBY+dJBq86UqtsDc4Y6Xev4mMiv1OzDBqf/VM5lCiQBc9yOXq1fs/sKHdoxNNcVr"

# Configure your database
config :phember, Phember.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "phember_prod"
