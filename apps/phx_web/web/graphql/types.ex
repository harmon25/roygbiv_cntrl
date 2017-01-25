defmodule PhxWeb.GQL.Types do
  use Absinthe.Schema.Notation


   object :colour do
    field :int, :integer
    field :hex, :string
  end

   object :node do
    field :name, :string
    field :colour, :colour
    field :state, :string
    field :group, :string
  end

end