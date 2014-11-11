defmodule Phember.Models.Request do
  defstruct uuid: nil,
    data_type: nil,
    req_type: nil,
    params: nil,
    path: nil

  # @type r :: %{
  #   uuid: binary,
  #   request: binary,
  #   params: binary,
  #   path: [binary]
  # }

  def create(req) do
    IO.puts "REQ BUILD => #{inspect req}"
    [data_type | path] = parse_path(req["path"])

    if length(path) == 0, do: path = nil

    %__MODULE__{
      uuid: req["uuid"],
      data_type: data_type,
      req_type: parse_type(req["type"]),
      params: parse_params(req["params"]),
      path: path
    }
  end

  defp parse_params(%{"data" => params}), do: params
  defp parse_params(nil), do: nil
  defp parse_params(%{}), do: nil

  defp parse_path(path), do: URI.decode(path) |> String.strip(?/) |> String.split "/"

  defp parse_type(type), do: String.downcase(type)

end

# find("post", {type: 1, your: "mom"}) -> findQuery
# %{"params" => %{"data" => %{"type" => 1, "your" => "mom"}}, "path" => "/posts", "type" => "GET", "uuid" => "7d1e6ec3-4fac-48ef-d058-56f03adaed7a"}

# find("post", 1)
# %{"path" => "/posts/1", "type" => "GET", "uuid" => "ae6b0bd5-f9b7-42b9-8798-44ff18ea88a3"}

# find("post") -> findAll
# %{"params" => %{}, "path" => "/posts", "type" => "GET", "uuid" => "0249394a-36f8-4ff9-dff4-575cc0468a27"}

# find("post", [1,2,3]) -> findByIds
# %{"path" => "/posts/1%2C2%2C3", "type" => "GET", "uuid" => "eda467e5-1c4f-471f-9c43-5f7bfadb9ce6"}

# store.save
# %{"params" => %{"data" => %{"post" => %{"author" => nil, "body" => "man", "title" => "whoa"}}}, "path" => "/posts", "type" => "POST", "uuid" => "94d7be20-ea1b-4967-c8de-a06a2a9d2a66"}