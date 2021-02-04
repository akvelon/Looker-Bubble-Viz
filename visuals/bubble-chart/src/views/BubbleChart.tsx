import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { MouseEvent, useCallback, useContext, useMemo } from "react";
import styled from "styled-components";

import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";

import { Circle, CirclePack, Label, Legend, TooltipContent } from "../components";
import { COLOR_PALETTE } from "../constants";
import { Option, Size } from "../enumerables";
import { hierarchyBuilder } from "../helpers";
import { useViewport } from "../hooks";
import { StoreContext } from "../Store";

let Wrapper = styled.div<Pick<Rect, "w" | "h">>`
	display: flex;
	width: ${({ w }) => w}px;
	height: ${({ h }) => h}px;
`;

export let BubbleChart = observer(() => {
	let { data, config } = useContext(StoreContext);
	let [width, height] = useViewport(-30, -40);

	let {
		tooltipData,
		tooltipLeft,
		tooltipTop,
		tooltipOpen,
		showTooltip,
		hideTooltip,
	} = useTooltip();

	let { TooltipInPortal } = useTooltipInPortal({ detectBounds: true, scroll: true });

	let handleMouseOver = useCallback(
		(event: MouseEvent, tooltipData: any) => {
			if (!config[Option.TOOLTIP_ENABLED]) return;
			let { clientX: tooltipLeft, clientY: tooltipTop } = event;
			showTooltip({ tooltipLeft, tooltipTop, tooltipData });
		},
		[config]
	);

	let handleClick = useCallback((event: MouseEvent, data: any) => {
		let links = [];
		for (let k in data) {
			if ("links" in data[k]) {
				links.push(...toJS(data[k].links));
			}
		}
		LookerCharts.Utils.openDrillMenu({ links, event });
	}, []);

	let root = useMemo(() => {
		return hierarchyBuilder(data, config[Option.SIZE_BY], config[Option.GROUP_BY]);
	}, [data, config]);

	let scale = useMemo(() => {
		return scaleOrdinal({
			domain: root?.children?.map(({ data }) => data.name),
			range: config[Option.COLOR_PALETTE],
		});
	}, [root, config]);

	let colorPalette = useMemo(() => {
		return config[Option.COLOR_PALETTE] ?? COLOR_PALETTE;
	}, [config]);

	let fontFactor = useMemo(() => {
		switch (config[Option.FONT_SIZE]) {
			case Size.LARGE:
				return 6;
			case Size.MEDIUM:
				return 8;
			case Size.SMALL:
				return 10;
			default:
				return 8;
		}
	}, [config]);

	let packWidth = useMemo(() => {
		let legendEnabled = config[Option.GROUP_BY] ?? "none";
		return legendEnabled === "none" ? width : width * 0.85;
	}, [config, width]);

	return (
		<Wrapper w={width} h={height}>
			{config[Option.GROUP_BY] !== "none" && (
				<Legend
					w={width * 0.15}
					fontSize={config[Option.FONT_SIZE]}
					fontFamily={config[Option.FONT_FAMILY]}
					scale={scale}
					direction="column"
					itemDirection="row-reverse"
					labelMargin="0 20px 0 0"
					shapeMargin="1px 0 0"
				/>
			)}
			{config[Option.TOOLTIP_ENABLED] && tooltipOpen && (
				<TooltipInPortal top={tooltipTop} left={tooltipLeft}>
					<TooltipContent
						fontFamily={config[Option.FONT_FAMILY]}
						primaryText={tooltipData[config[Option.PRIMARY_LABEL]]?.value}
						secondaryText={tooltipData[config[Option.SECONDARY_LABEL]]?.value}
						numericValue={tooltipData[config[Option.SIZE_BY]]?.value}
					/>
				</TooltipInPortal>
			)}
			<CirclePack root={root} width={packWidth} height={height}>
				{bubbles =>
					bubbles?.map(({ r, cx, cy, x, y, w, h, data, parent, children }, i) => {
						let fill = scale(data.name);
						if (!children) {
							let parentFill = scale(parent.data.name);
							let newPalette = colorPalette.filter((fill: string) => fill !== parentFill);
							fill = newPalette[i % newPalette.length];
						}
						if (parent.children.length === 1) {
							fill = "rgba(0, 0, 0, 0)";
						}
						return (
							<Group
								key={i}
								onClick={e => handleClick(e, data)}
								onMouseOver={e => (!children ? handleMouseOver(e, data) : null)}
								onMouseOut={hideTooltip}>
								<Circle r={r} cx={cx} cy={cy} fill={fill as string} />
								<Label
									x={x}
									y={y}
									w={w}
									h={h}
									shortenText={config[Option.SHORTEN_LABELS]}
									primaryText={data[config[Option.PRIMARY_LABEL]]?.value!}
									secondaryText={data[config[Option.SECONDARY_LABEL]]?.value!}
									fontFamily={config[Option.FONT_FAMILY]}
									fontSize={w / fontFactor}
								/>
							</Group>
						);
					})
				}
			</CirclePack>
		</Wrapper>
	);
});
