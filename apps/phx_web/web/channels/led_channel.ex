defmodule PhxWeb.LED.Channel do
  use Phoenix.Channel

  def join("led:data", _message, socket) do
    {:ok, socket}
  end



end
