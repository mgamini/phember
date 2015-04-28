defmodule Phember.DataChannel do
  use Phoenix.Channel

  alias Phoenix.Socket
  alias Phember.Session

  # def join("data:authorize", auth_message, socket) do

  # end

  def join("data:join", auth_message, socket) do
    {:ok, userid, token} = Session.AuthService.authorize_user(auth_message)
    :ok = Session.Pool.authorize(userid, token)

    socket = Socket.assign(socket, :userid, userid)
          |> Socket.assign(:token, token)

    send(self, :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    push socket, "user", %{id: socket.assigns.userid, token: }
    {:noreply, socket}
  end

  def join("data:store", auth_msg, socket) do
    IO.inspect auth_msg
    IO.inspect socket
    {:ok, socket}
  end

end

    # def join(topic, auth_msg, socket) do
    #   ...
    #   send(self, :after_join)
    #   {:ok, socket}
    # end

    # def handle_info(:after_join, socket) do
    #   push socket, "feed", %{list: feed_items(socket)}
    #   {:noreply, socket}
    # end