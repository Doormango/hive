import type { PieceColor } from "@/types/common/engine/piece";
import type { GameUIState } from "@/client/components/GameUI";

export type PlayerColor = PieceColor | "Spectator";

export type ReRenderFn = (state: GameUIState, recenter: boolean) => void;