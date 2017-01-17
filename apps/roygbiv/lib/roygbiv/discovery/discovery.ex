defmodule Roygbiv.DiscoveryState do
  defstruct  socket: nil, nodes: [], interval: nil
  @type t :: %__MODULE__{socket: pid, nodes: list, interval: reference }
end

defmodule Roygbiv.Discovery do
  use GenServer
  # wanted to use multicast, but was having problems with it. bun it - broadcasting...
  @multicastaddr {255,255,255,255}
  @multicastport 2025

  def start_link() do
      GenServer.start_link(__MODULE__, %Roygbiv.DiscoveryState{}, name: __MODULE__)
  end

  def init(%Roygbiv.DiscoveryState{} = state) do

    udp_opts = [:binary,
                {:active, true},
                {:reuseaddr, true},
                {:broadcast, true}]

     {:ok, socket} = :gen_udp.open(0 ,udp_opts)

      #fire two udp discover packets immediatly
      :gen_udp.send(socket, @multicastaddr, @multicastport , "helloo" )
      :gen_udp.send(socket, @multicastaddr, @multicastport , "helloo" )

      #:gen_udp.controlling_process(socket, self())
      #:gen_udp.send(socket, @multicastaddr, @multicastport , "answer meee" )
      {:ok, disc_interval} = :timer.apply_interval(30000, :gen_udp, :send, [socket, @multicastaddr, @multicastport , "HI AGAIN"])
      {:ok, %Roygbiv.DiscoveryState{state | socket: socket, interval: disc_interval}}

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

def handle_cast(:discover, %Roygbiv.DiscoveryState{socket: socket} = state) do
  :gen_udp.send(socket, @multicastaddr, @multicastport, "somemsg!")
  :gen_udp.send(state.socket, @multicastaddr, @multicastport, "HI!")
  {:noreply, %Roygbiv.DiscoveryState{ state | socket: socket} }
end

def handle_call(:nodes, _from, %Roygbiv.DiscoveryState{nodes: nodes} = state) do
  {:reply, nodes, state }
end


def handle_info({:udp, _socket, ip, _fromport, packet}, state) do
      case decode_response(packet) do
        {:error, reason} ->
            IO.puts reason
            {:noreply, state}
        json_resp ->
          node = %Roygbiv.NodeState{ip: :inet.ntoa(ip),
                               name: json_resp["device"],
                               state: json_resp["state"],
                               colour: json_resp["hex"] }

          start_or_update_node(node)
      end

      {:noreply, state}
  end

  def start_or_update_node(node) do
    case (Roygbiv.Node.start_link(node)) do
      {:error, {:already_started, pid}} ->
        #OK refresh
         Roygbiv.Node.refresh_state(node)
         {:ok, {:refreshed, pid}}
       {:ok, pid} ->
         {:ok, {:started, pid}}
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
