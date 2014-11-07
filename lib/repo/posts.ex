defmodule Phember.Repo.Posts do
  alias Phember.Repo

  def echo(inp) do
    {:ok, inp}
  end

  def get({path, params}) do
    {:ok, path, params}
  end

  def get({path, nil}) do
    {:ok, path}
  end

end