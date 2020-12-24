import styled from "styled-components";

import { LegendOrdinal } from "@visx/legend";

interface Props {
	fontFamily: string;
}

export let Legend = styled(LegendOrdinal)<Props>`
	font-family: ${({ fontFamily }) => fontFamily};
	position: absolute;
	left: 0;
	top: 0;
`;
