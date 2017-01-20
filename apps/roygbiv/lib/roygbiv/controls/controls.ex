defmodule Roygbiv.Controls do
  @moduledoc """
  Documentation for Roygbiv.Controls
  """
  alias Roygbiv.Discovery
  alias Roygbiv.Node
  def turn_on(node_name) do
      send_control(node_name, "on")
  end

  def rainbow_mode(node_name) do
      send_control(node_name, "rainbow")
  end

  def turn_off(node_name) do
      send_control(node_name, "off")
  end

  def set_colour(node_name, {r,g,b}) do
      send_control(node_name, "custom?r=#{r}&g=#{g}&b=#{b}")
  end

  def set_colour(node_name, :red) do
      send_control(node_name, "red")
  end

  def set_colour(node_name, :blue) do
      send_control(node_name, "blue")
  end

  def set_colour(node_name, :cyan) do
      send_control(node_name, "cyan")
  end

  def set_colour(node_name, :green) do
      send_control(node_name, "green")
  end

  def set_colour(node_name, :purple) do
      send_control(node_name, "purple")
  end

  defp name_to_ip(node_name) do
    %{ip: ip} =  Keyword.fetch!(Discovery.nodes, String.to_atom(node_name))
    ip
  end

  defp craft_uri(ip, action) do
    "http://#{ip}/#{action}"
  end

  defp send_control(node_name, action) do
    uri = craft_uri(name_to_ip(node_name), action)
    %{body: body} = HTTPoison.get!(uri)
    {:ok, Node.build_state(body)}
  end
end
