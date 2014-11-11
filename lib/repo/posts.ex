defmodule Phember.Repo.Posts do
  alias Phember.Repo

  def get(nil, nil), do: findAll()
  def get(path, nil), do: find(path)

  defp findAll(), do: spoofList() |> find
  defp find(ids), do: {:ok, Enum.map(ids, &(spoof(&1)))}
  defp spoof(id), do:
    %{id: id, title: Elixilorem.sentence, body: Elixilorem.paragraphs(:random.uniform(10)), author: :random.uniform(10)}

  defp spoofList(), do: spoofList([], :random.uniform(10))
  defp spoofList(list, 0), do: list
  defp spoofList(list, count), do: spoofList(list ++ [count], count - 1)
end