defmodule Phember.Repo.Posts do
  alias Phember.Repo

  def get(message), do: echo(message)
  def echo(inp) do
    IO.puts "echo ! #{inspect inp}"
    {:ok, inp}
  end

  def get(path, nil), do: find(path)


  defp find(ids), do: {:ok, Enum.map(ids, &(spoof(&1)))}
  defp spoof(_id), do:
    %{title: Elixilorem.sentence, body: Elixilorem.paragraphs(:random.uniform(10)), author: :random.uniform(10)}

end