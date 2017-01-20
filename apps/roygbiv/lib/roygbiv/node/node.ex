defmodule Roygbiv.Node do
  @moduledoc """
  Documentation for Roygbiv.Node
  """
  use GenServer
  alias Roygbiv.Node.State
  require Logger

  def start_link(%State{name: device_name} = node) do
      name = via_tuple(device_name)
      GenServer.start_link(__MODULE__, node, name: name)
    end

  @doc """
  Fetch node details by name

  ## Examples

      iex> Roygbiv.Node.node_info "test_leds"
      %Roygbiv.Node.State{name: "test_leds"}

  """
  def node_info(node_name) do
    GenServer.call(via_tuple(node_name), :info)
  end

  @doc """
  Refreshes a nodes' state reference
  """
   def refresh_state(node_state) do
     GenServer.cast(via_tuple(node_state.name), {:update, node_state})
   end

   @doc """
   Set a node to a group
   """
   def set_node_group(node_name, group_name) do
     GenServer.cast(via_tuple(node_name), {:set_group, group_name})
   end

   @doc """
   Build a state struct
   """
   def build_state(raw_json) do
     case(Poison.decode(raw_json)) do
       {:ok, json_resp} ->
         %State{name: json_resp["device"],
                state: node_state_to_atom(json_resp["state"]),
                colour: [hex: json_resp["hex"], int: json_resp["int"]] }
       {:error, reason} ->
         Logger.error reason
         nil

     end
   end

   defp via_tuple(device_name) do
      {:via, Registry, {:node_process_registry, device_name}}
   end

   defp node_state_to_atom(state_int) do
     case(state_int) do
       0 -> :off
       1 -> :on
       3 -> :rainbow
       atom -> atom
     end
   end

   # SERVER CALLBACKS
   def handle_cast({:update, node_state}, state) do
     # lols, want some state with your state?
     {:noreply,  %State{state | state: node_state_to_atom(node_state.state), colour: node_state.colour}}
   end

   def handle_cast({:set_group, group_name}, state) do
     {:noreply,  %State{state | group: group_name}}
   end

  def handle_call(:info, _from, state) do
    {:reply, state, state}
  end

end
