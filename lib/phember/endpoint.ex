defmodule Phember.Endpoint do
  use Phoenix.Endpoint, otp_app: :phember

  # Serve at "/" the given assets from "priv/static" directory
  plug Plug.Static,
    at: "/", from: :phember,
    only: ~w(css images js favicon.ico robots.txt assets tests crossdomain.xml testem.js)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_phember_key",
    signing_salt: "jPcBQEjg",
    encryption_salt: "VyonS3ZC"

  plug :router, Phember.Router
end
