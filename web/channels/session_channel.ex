defmodule Phember.SessionChannel do
  use Phoenix.Channel

  def join(socket, "user", %{"id" => id, "token" => token}) do
    IO.puts "join req : #{id} - #{token}"

    if id == 123456789 && token == "tokentokentoken" do
      IO.puts "success"
      socket = assign(socket, :user, id)

      reply socket, "join", %{content: "joined successfully"}
      {:ok, socket}
    else
      IO.puts "error"
      reply socket, "error", %{content: "failed to auth"}
      {:error, socket, :unauthorized}
    end
  end

  def join(socket, "data", _) do
    reply socket, "join", %{content: "joined successfully"}
    {:ok, socket}
  end

  def event(socket, "data", message) do
    IO.puts "message: #{inspect message}"

    reply socket, "data", %{content: "echo"}
  end

end