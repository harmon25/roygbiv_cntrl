defmodule Roygbiv.Discovery do
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
                {:reuseaddr, true},
                {:broadcast, true}]

     # open socket to send broadcasts
     {:ok, socket} = :gen_udp.open(0, udp_opts)

      #fire two udp discover packets immediatly
      ping(socket)

      #:gen_udp.controlling_process(socket, self())
      #:gen_udp.send(socket, @broadcastaddr, @broadcastport , "answer meee" )
      {:ok, disc_interval} = :timer.apply_interval(30000, :gen_udp, :send, [socket, @broadcastaddr, @broadcastport, "HI AGAIN"])
      {:ok, %State{state | socket: socket, interval: disc_interval}}

      #{:ok, %Roygbiv.DiscoveryState{socket: socket}}
   end


   def nodes() do
     GenServer.call( __MODULE__, :nodes)
   end

  def run() do
    GenServer.cast( __MODULE__, :discover)
  end

  def set_group() do
    GenServer.cast( __MODULE__, :discover)
  end

def handle_cast(:discover, %State{socket: socket} = state) do
  ping(socket)
  {:noreply, %State{ state | socket: socket} }
end

def handle_call(:nodes, _from, %State{nodes: nodes} = state) do
  {:reply, nodes, state }
end


def handle_info({:udp, _socket, ip, _fromport, packet}, state) do
      case decode_response(packet) do
        {:error, reason} ->
            Logger.error reason
            {:noreply, state}
        json_resp ->
          node = %Roygbiv.Node.State{ip: :inet.ntoa(ip),
                               name: json_resp["device"],
                               state: json_resp["state"],
                               colour: json_resp["hex"] }

          {status, _pid} = start_or_update_node(node)
          Logger.info "Reply from #{node.name}: #{Atom.to_string(status)}"
      end

      {:noreply, state}
  end

  defp ping(socket) do
    :gen_udp.send(socket, @broadcastaddr, @broadcastport, "ping" )
    :gen_udp.send(socket, @broadcastaddr, @broadcastport, "pingping" )
  end

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

  def decode_response(packet) do
    case Poison.decode(packet) do
      {:ok, json_status} -> json_status
        _ ->
       {:error, "cannot decode json response"}
    end
  end

end
