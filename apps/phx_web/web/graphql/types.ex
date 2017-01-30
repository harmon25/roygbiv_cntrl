defmodule PhxWeb.GQL.Types do
  use Absinthe.Schema.Notation


   object :colour do
    field :p_rgb, list_of(:integer)
    field :c_rgb, list_of(:integer)
  end

   object :node do
    field :name, :string
    field :colour, :colour
    field :state, :string
    field :group, :string
  end

end
