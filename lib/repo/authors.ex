defmodule Phember.Repo.Authors do
  alias Phember.Repo

  def echo(inp) do
    IO.puts "echo ! #{inspect inp}"
    {:ok, inp}
  end

  def get(message), do: echo(message)

  def get(message, message_two), do: echo(message)

end