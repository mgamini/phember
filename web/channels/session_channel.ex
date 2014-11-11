defmodule Phember.SessionChannel do
  use Phoenix.Channel
  alias Phember.Data

  @name __MODULE__

  def join(socket, "user", %{"id" => id, "token" => token} = msg) do
    IO.puts "join req : #{id} - #{token}"

    if id == 123456789 && token == "tokentokentoken" do
      IO.puts "success"

      Agent.update(@name, fn dict ->
        Dict.update(dict, :auth_level, 10, &(&1))
      end)

      reply socket, "join", %{content: "joined successfully"}
      {:ok, socket}
    else
      IO.puts "error"
      reply socket, "error", %{content: "failed to auth"}
      {:error, socket, :unauthorized}
    end
  end

  def join(socket, "data", _) do
    socket = init_connection(socket)

    reply socket, "join", %{content: "joined successfully"}

    {:ok, socket}
  end

  def event(socket, "data", message) do
    IO.puts "message: #{inspect message}"

    IO.inspect get_assign(socket, :data_server)
    IO.inspect message
    IO.inspect Agent.get(@name, &(&1[:auth_level]))

    res = get_assign(socket, :data_server)
      |> Phember.Broker.request(message, Agent.get(@name, &(&1[:auth_level])))

    IO.inspect res

    reply socket, "data", res
  end

  defp init_connection(socket) do
    Agent.start_link(fn -> HashDict.new end, name: @name)
    assign(socket, :data_server, Phember.Broker.start)
  end

end