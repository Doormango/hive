import { Fragment, h } from "preact";

import "@/client/styles/PieceTile";

import type { Piece } from "@/types/common/game/piece";
import type { BaseTileProps } from "@/types/client/tile";

export type PieceTileState = "Normal" | "Inactive" | "Selected" | "Shaking";
export interface PieceTileProps extends BaseTileProps {
    piece: Piece;
    state: PieceTileState;
}

// TODO add optional circle on tile with number for stack height / amount in inventory
function PieceTile(props: PieceTileProps): h.JSX.Element {
    const { type, color } = props.piece;
    const mouseDown = (e: MouseEvent) => {
        e.stopImmediatePropagation(); // prevent interfering with parent component
        if (props.state !== "Inactive" && props.handleClick) props.handleClick();
    };

    return (
        <Fragment>
            <g
                class={`tile ${props.state}`}
                style={`translate: ${props.pos.join("px ")}px`}
                onMouseDown={props.handleClick && mouseDown}
            >
                <use xlinkHref="#outlined-rounded-hex" class={color} />
                <use xlinkHref={`#${type}`} />
            </g>
        </Fragment>
    );
}

export default PieceTile;