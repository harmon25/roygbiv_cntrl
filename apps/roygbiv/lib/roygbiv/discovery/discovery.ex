defmodule Roygbiv.Discovery do
  @moduledoc """
  Documentation for Roygbiv.Discovery
  """
  use GenServer
  require Logger
  alias Roygbiv.Discovery.State
  alias Roygbiv.Node
  # wanted to use multicast, but was having problems with it. bun it - broadcasting...
  @broadcastaddr {255,255,255,255}
  @broadcastport 2025

  def start_link() do
      GenServer.start_link(__MODULE__, %State{}, name: __MODULE__)
  end

  def init(%State{} = state) do

    udp_opts = [:binary,
                {:active, true},
                {:broadcast, true}]

     # open socket to send broadcasts
     {:ok, socket} = :gen_udp.open(0, udp_opts)

      #fire two udp discover packets immediatly
      send_ping(socket)

      #:gen_udp.controlling_process(socket, self())
      #:gen_udp.send(socket, @broadcastaddr, @broadcastport , "answer meee" )
      {:ok, disc_interval} = :timer.apply_interval(180000, :gen_udp, :send, [socket, @broadcastaddr, @broadcastport, "HI AGAIN"])
      {:ok, %State{state | socket: socket, interval: disc_interval}}

      #{:ok, %Roygbiv.DiscoveryState{socket: socket}}
   end

   @doc """
   Return a list of discovered node names
   """
   def nodes() do
     GenServer.call( __MODULE__, :nodes)
   end

  @doc """
  Send a discovery broadcast ping
  """
  def ping() do
    GenServer.cast( __MODULE__, :ping)
  end

  @doc """
  Start node process if it doesnt exist, update state otherwise.
  """
  def start_or_update_node(node) do
    case (Node.start_link(node)) do
      {:error, {:already_started, pid}} ->
        #OK refresh
          Node.refresh_state(node)
          {:refreshed, pid}
       {:ok, pid} ->
         {:started, pid}
    end
  end

  defp send_ping(socket) do
    :gen_udp.send(socket, @broadcastaddr, @broadcastport, "ping")
    :gen_udp.send(socket, @broadcastaddr, @broadcastport, "pingping")
    :gen_udp.send(socket, @broadcastaddr, @broadcastport, "pingpingping")
  end

  # SERVER CALLBACKS
  def handle_cast(:ping, %State{socket: socket} = state) do
    send_ping(socket)
    {:noreply, %State{ state | socket: socket} }
  end

  def handle_call(:nodes, _from, %State{nodes: nodes} = state) do
    node_details =
    Enum.map(nodes, fn node_name ->
      {String.to_atom(node_name), Node.node_info(node_name)}
    end)
    {:reply, node_details, state }
  end

  def handle_info({:udp, _socket, ip, _fromport, packet}, state) do
    case Node.build_state(packet) do
      {:error, reason} ->
          Logger.error reason
          {:noreply, state}
      node ->
        node_w_ip = %Roygbiv.Node.State{node | ip: :inet.ntoa(ip)}

        {status, _pid} = start_or_update_node(node_w_ip)
        Logger.info "Reply from #{node.name}: #{Atom.to_string(status)}"
        new_nodes = [ node.name | state.nodes ]
          |> Enum.sort() |> Enum.dedup()
        {:noreply, %State{state| nodes: new_nodes}}
    end
  end
end
