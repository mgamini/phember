defmodule Phember.SessionChannel do
  use Phoenix.Channel

  def join(socket, "user", _) do
    reply socket, "join", %{content: "joined successfully"}
    {:ok, socket}
  end

end