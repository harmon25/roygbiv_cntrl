defmodule Roygbiv.Node.State do
  defstruct  ip: nil, name: nil, state: nil, colour: nil, group: nil
  @type t :: %__MODULE__{ip: tuple, name: String.t, state: integer, colour: String.t, group: String.t}
end
