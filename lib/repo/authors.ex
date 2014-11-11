defmodule Phember.Repo.Authors do
  alias Phember.Repo

  def get(path, nil), do: find(path)

  defp find(ids), do: {:ok, Enum.map(ids, &(spoof(&1)))}
  defp spoof(id), do:
    %{id: id, first_name: Elixilorem.word, last_name: Elixilorem.word, posts: [1]}

end