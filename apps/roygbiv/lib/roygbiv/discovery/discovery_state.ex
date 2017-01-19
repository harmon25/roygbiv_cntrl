defmodule Roygbiv.Discovery.State do
  defstruct  socket: nil, nodes: [], interval: nil
  @type t :: %__MODULE__{socket: pid, nodes: list, interval: reference }
end
