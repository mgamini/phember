defmodule Phember.Broker do
  use GenServer
  alias Phember.Models.Request

  @modules %{
    "posts" => Phember.Repo.Posts,
    "authors" => Phember.Repo.Authors
  }

  def start() do
    {:ok, pid} = GenServer.start_link(__MODULE__, nil)
    pid
  end

  def request(pid, req, auth_level), do: GenServer.call(pid, {:request, Request.create(req), auth_level})


  #
  # Gen Server Calls
  #

  def handle_call({:request, %Request{req_type: "get", data_type: data_type, path: path, params: params} = req, auth_level}, _from, state) do
    case apply(@modules[data_type], :get, [path, params]) do
      {:ok, result} -> {:reply, result, state}
      {:error, error} -> {:reply, error, state}
    end
  end

  def handle_call({:request, %Request{req_type: "post"} = req, auth_level}, _from, state) do
    IO.puts "post request recd"
    {:reply, req, state}
  end

end