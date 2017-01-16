defmodule Roygbiv.Node do
  defstruct  ip: nil, name: nil, state: nil, colour: nil
  @type t :: %__MODULE__{ip: tuple, name: String.t, state: integer, colour: String.t}
end

defmodule Roygbiv.DiscoveryState do
  defstruct  socket: nil, nodes: [], interval: nil
  @type t :: %__MODULE__{socket: pid, nodes: list, interval: reference }
end

defmodule Roygbiv.Discovery do
  use GenServer
  @multicastaddr {239,255,255,255}
  @multicastport 2025

  def start_link() do
      GenServer.start_link(__MODULE__, %Roygbiv.DiscoveryState{}, name: __MODULE__)
  end

  def init(%Roygbiv.DiscoveryState{} = state) do
     {:ok, socket} = :gen_udp.open(0, [:binary,
                                       :inet, {:ip, {192,168,1,43} },
                                       {:active, true},
                                       {:multicast_if, {192,168,1,43}},
                                       {:multicast_ttl, 2},
                                       {:add_membership, {@multicastaddr, {192,168,1,43}} }])

      #fire two udp discover packets immediatly
      :gen_udp.send(socket, @multicastaddr, @multicastport , "helloo" )
      :gen_udp.send(socket, @multicastaddr, @multicastport , "answer meee" )
      {:ok, disc_interval} = :timer.apply_interval(10000, :gen_udp, :send, [socket, @multicastaddr, @multicastport , "HI AGAIN"])

      {:ok, %Roygbiv.DiscoveryState{state | socket: socket, interval: disc_interval}}
   end


  def run() do
    GenServer.cast( __MODULE__, :discover)
  end

def handle_cast(:discover, state) do
  :gen_udp.send(state.socket, @multicastaddr, @multicastport, "some msg!")
  :gen_udp.send(state.socket, @multicastaddr, @multicastport, "HI!")
  {:noreply, state }
end

def handle_info({:udp, _socket, ip, _fromport, packet}, state) do
      IO.inspect ip
      json_resp =  Poison.decode!(packet)
      node = %Roygbiv.Node{ip: :inet.ntoa(ip),
                           name: json_resp["device"],
                           state: json_resp["state"],
                           colour: json_resp["colour"] }
      case (Enum.find_index(state.nodes, fn(n)-> n.name == node.name end)) do
        nil ->
          {:noreply, %Roygbiv.DiscoveryState{state | nodes: [ node | state.nodes]}}
         idx ->
          {:noreply, state}
      end

    end

end
