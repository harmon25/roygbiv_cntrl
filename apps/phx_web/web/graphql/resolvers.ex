defmodule PhxWeb.GQL.Resolvers do

  def set_colour(args, _info) do
    Roygbiv.Controls.set_colour(args.node, {args.r, args.g, args.b})
  end
end
