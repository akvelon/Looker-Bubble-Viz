import React from "react";

import { Group } from "@visx/group";
import { Pack } from "@visx/hierarchy";
import { HierarchyNode } from "@visx/hierarchy/lib/types";

interface Props {
	root: HierarchyNode<any>;
	width: number;
	height: number;
	children(children: any[]): JSX.Element[];
}

export function CirclePack({ root, width, height, children }: Props) {
	return (
		<>
			<svg width={width} height={height}>
				<Pack root={root} size={[width, height]}>
					{data => (
						<Group top={0} left={0}>
							{children(
								data
									.descendants()
									.slice(1)
									.map(({ x, y, r, data, parent, children }) => ({
										r,
										w: r * 2,
										h: r * 2,
										cx: x,
										cy: y,
										x: x - r,
										y: y - r,
										data,
										parent,
										children,
									}))
							)}
						</Group>
					)}
				</Pack>
			</svg>
		</>
	);
}
