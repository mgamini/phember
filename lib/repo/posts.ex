defmodule Phember.Repo.Posts do
  alias Phember.Repo

  def get(path, nil), do: find(path)

  defp find(ids), do: {:ok, Enum.map(ids, &(spoof(&1)))}
  defp spoof(id), do:
    %{id: id, title: Elixilorem.sentence, body: Elixilorem.paragraphs(:random.uniform(10)), author: :random.uniform(10)}

end