defmodule Phember.Router do
  use Phoenix.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Phember do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  socket "/ws", Phember do
    channel "data:*", DataChannel
  end

  # Other scopes may use custom stacks.
  # scope "/api", Phember do
  #   pipe_through :api
  # end
end
