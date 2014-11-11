defmodule Phember.Repo.Authors do
  alias Phember.Repo

  def echo(inp) do
    IO.puts "echo ! #{inspect inp}"
    {:ok, inp}
  end

  def get(message), do: echo(message)


  def get(path, nil), do: find(path)

  defp find(ids), do: Enum.map(ids, &(spoof(&1)))
  defp spoof(_id), do:
    %{first_naem: Elixilorem.word, last_name: Elixilorem.word, posts: [1]}

end