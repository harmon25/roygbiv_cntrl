defmodule Roygbiv do
  @moduledoc """
  Documentation for Roygbiv.
  """
  alias Roygbiv.Discovery
  alias Roygbiv.Node

def nodes() do
  Discovery.nodes()
end
  @doc """
  Hello world.

  ## Examples

      iex> Roygbiv.hello
      :world

  """
  def hello do
    :world
  end
end
