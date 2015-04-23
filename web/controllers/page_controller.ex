defmodule Phember.PageController do
  use Phember.Web, :controller

  plug :action

  def index(conn, _params) do
    render conn, "index.html"
  end
end
