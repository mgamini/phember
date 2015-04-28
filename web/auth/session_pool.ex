defmodule Phember.Session.Pool do
  use GenServer

  @authservice __MODULE__

  def start_link(), do:
    GenServer.start_link(@authservice, [], name: @authservice)

  def authorize(id, token), do:
    GenServer.call(@authservice, {:authorize, id, token})

  def deauthorize(id), do:
    GenServer.call(@authservice, {:deauthorize, id})

  def is_authorized?(id), do:
    GenServer.call(@authservice, {:is_authorized?, id})

  #
  # GenServer callbacks
  #

  def init(state) do
    {:ok, state}
  end

  def handle_call({:authorize, id, token}, _from, state), do:
    {:reply, :ok, add_session({id, token}, state)}

  def handle_call({:deauthorize, id}, _from, state), do:
    {:reply, :ok, remove_session(id, state)}

  def handle_call({:is_authorized?, id}, _from, state), do:
    {:reply, find_session(id, state) !== nil, state}


  #
  # Private
  #

  defp find_session(searchid, state) when is_integer(searchid), do:
    Enum.find(state, fn({id, _token}) -> id == searchid end)
  defp find_session(searchtoken, state) when is_binary(searchtoken), do:
    Enum.find(state, fn({_id, token}) -> token == searchtoken end)

  defp add_session({id, token}, state) do
    case find_session(id, state) do
      nil -> state ++ [{id, token}]
      _ -> List.keyreplace(state, id, 0, {id, token})
    end
  end

  defp remove_session(searchid, state), do:
    List.keydelete(state, searchid, 0)

end