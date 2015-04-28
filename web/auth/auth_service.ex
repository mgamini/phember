defmodule Phember.Session.AuthService do

  def authorize_user(_token), do:
    {:ok, :random.uniform(1000), generate_token()}

  defp generate_token(), do:
    :base64.encode(:crypto.strong_rand_bytes(64))

end