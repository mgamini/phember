defmodule Phember.SessionChannel do
  use Phoenix.Channel

  def join(socket, "user", %{"token" => token, "user_id" => user_id}) do
    socket = assign(socket, :user, user_id)

    reply socket, "join", %{content: "joined successfully"}
    {:ok, socket}
  end



end