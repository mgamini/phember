defmodule Phxbuild.PageController do
  use Phxbuild.Web, :controller

  plug :action

  def index(conn, _params) do
    render conn, "index.html"
  end
end
