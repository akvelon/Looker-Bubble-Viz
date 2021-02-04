import styled from "styled-components";

import { LegendOrdinal } from "@visx/legend";

import { Size } from "../enumerables";

interface Props {
	fontSize: string;
	fontFamily: string;
}

function toPixel(fontSize: string): number {
	switch (fontSize) {
		case Size.LARGE:
			return 18;
		case Size.MEDIUM:
			return 16;
		case Size.SMALL:
			return 14;
		default:
			return 16;
	}
}

export let Legend = styled(LegendOrdinal)<Props>`
	font-size: ${({ fontSize }) => toPixel(fontSize)}px;
	font-family: ${({ fontFamily }) => fontFamily};
	position: absolute;
	left: 0;
	top: 0;
`;
