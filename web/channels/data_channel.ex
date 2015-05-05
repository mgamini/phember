defmodule Phember.DataChannel do
  use Phoenix.Channel

  alias Phoenix.Socket
  alias Phember.Session

  def join("data:join", auth_message, socket) do
    {:ok, userid, token} = Session.AuthService.authorize_user(auth_message)
    :ok = Session.Pool.authorize(userid, token)

    socket = Socket.assign(socket, :userid, userid)
          |> Socket.assign(:token, token)

    send(self, :after_join)
    {:ok, socket}
  end

  def join("data:store", %{"id" => id, "token" => token}, socket) do
    if Session.Pool.is_authorized?(token) do
      {:ok, socket}
    else
      :ignore
    end
  end

  def handle_info(:after_join, socket) do
    push socket, "user", %{id: socket.assigns.userid, token: socket.assigns.token}
    {:noreply, socket}
  end

end

