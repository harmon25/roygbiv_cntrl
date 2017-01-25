defmodule PhxWeb.GQL.Channel do
  use Phoenix.Channel

  def join("gql:query", _message, socket) do
    {:ok, socket}
  end


def handle_in("gql", params = %{"query" => query}, socket) do
    variables = Map.get(params, "variables", %{})
    options = [variables: variables]
    {:ok, result} = Absinthe.run(query, PhxWeb.GQL.Schema, options)
    {:reply, {:ok, result}, socket}
  end


end
