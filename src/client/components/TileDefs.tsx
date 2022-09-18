import { Component, Fragment, h } from "preact";

import * as icons from "@/client/icons.json";

import type { PieceType } from "@/types/common/piece";

export interface HexDimensions {
    radius: number;
    gap: number;
    cornerRad: number;
}

export interface TileDefsProps {
    size: HexDimensions;
}

const bugPaths: Record<PieceType, string> = icons;

export default class TileDefs extends Component<TileDefsProps> {
    /**
     * Get path definition for hexagon of given radius, with rounded corners of given radius.
     *
     * @param hexRad radius of circle in which un-rounded hexagon fits snugly
     * @param cornerRad radius of circle arcs to use for rounding corners (cuts off corner)
     * @returns path definition (attribute 'd' of SVG <path> element)
     */
    private static roundedHexPath(hexRad: number, cornerRad: number): string {
        const thirdPi: number = Math.PI / 3;
        const innerRad: number = hexRad - 2 * cornerRad / Math.sqrt(3);

        let hexPath = "";
        for (let i = 0; i < 6; i++) {
            const theta: number = i * thirdPi;
            const [[x1, y1], [x2, y2]] = [1, -1].map((d: number) => [
                innerRad * Math.sin(theta) + cornerRad * Math.sin(theta - d * thirdPi / 2),
                innerRad * Math.cos(theta) + cornerRad * Math.cos(theta - d * thirdPi / 2)
            ]);

            hexPath += `${i ? "L" : "M"}${x1},${y1}` // move/line to (x1,y1)
                + `A${cornerRad},${cornerRad},0,0,0,${x2},${y2}`; // arc to (x2,y2)
        }
        return hexPath + "Z"; // close path
    }

    public override render(props: TileDefsProps): h.JSX.Element {
        return (
            <Fragment>
                <defs>
                    <path id="hex" d={TileDefs.roundedHexPath(props.size.radius, props.size.cornerRad)} />
                    <g
                        id="placeholder"
                        style={`stroke-width: ${0.6 * props.size.gap}`}
                    >
                        {[0.95, 0.6].map((scale, index) =>
                            <use
                                key={index}
                                xlinkHref="#hex"
                                transform={`scale(${scale})`}
                                style={index === 0 ? "stroke-dasharray: 8,4" : ""}
                            />
                        )}
                    </g>
                    {Object.entries(bugPaths).map(([bug, path]) => <path key={bug} id={bug} d={path} />)}
                </defs>
                {this.props.children}
            </Fragment>
        );
    }
}