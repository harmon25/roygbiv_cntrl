defmodule PhxWeb.GQL.Schema do
	use Absinthe.Schema
	import_types PhxWeb.GQL.Types

	 query do
		 @desc "List Nodes"
	    field :nodes, list_of(:node) do
	      resolve fn _args, _info ->
	        {:ok, Roygbiv.nodes()}
	      end
	    end
	  end

	mutation do
	  @desc "Set a node colour"
	  field :set_colour, type: :node do
			arg :node, non_null(:string)
	    arg :r, non_null(:integer)
	    arg :g, non_null(:integer)
	    arg :b, non_null(:integer)

	    resolve &PhxWeb.GQL.Resolvers.set_colour/2
	  end
	end
	
end
