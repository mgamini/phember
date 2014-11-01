defmodule Phember.Router do
  use Phoenix.Router

  pipeline :browser do
    plug :accepts, ~w(html)
    plug :fetch_session
  end

  pipeline :api do
    plug :accepts, ~w(json)
  end

  scope alias: Phember do
    get "/", PageController, :index
  end

  # scope "/" do
  #   pipe_through :browser # Use the default browser stack

  #   get "/", Phember.PageController, :index
  # end

  # Other scopes may use custom stacks.
  # scope "/api" do
  #   pipe_through :api
  # end
end
