defmodule Roygbiv.Node do
  use GenServer
  alias Roygbiv.Node.State

  def start_link(%State{name: device_name} = node) do
      name = via_tuple(device_name)
      GenServer.start_link(__MODULE__, node, name: name)
    end

   def refresh_state(node_state) do
     GenServer.cast(via_tuple(node_state.name), {:update, node_state})
   end

   def handle_cast({:update, node_state}, _state) do
     {:noreply,  node_state}
   end

   defp via_tuple(device_name) do
      {:via, Registry, {:node_process_registry, device_name}}
   end

end
