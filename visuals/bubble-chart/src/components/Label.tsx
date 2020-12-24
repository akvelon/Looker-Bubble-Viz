import React from "react";
import styled from "styled-components";

interface Props extends Rect {
	primaryText: string;
	secondaryText?: string;
	fontSize: number;
	fontFamily?: string;
	transitionTiming?: number;
}

let Wrapper = styled.foreignObject<Pick<Props, "transitionTiming">>`
	transition: ${({ transitionTiming = 0.5 }) => transitionTiming}s;
`;

let SingleLabel = styled.div<Pick<Props, "fontSize" | "fontFamily" | "transitionTiming">>`
	font-family: ${({ fontFamily = "system-ui" }) => fontFamily};
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	height: 100%;
	transition: ${({ transitionTiming = 0.5 }) => transitionTiming}s;
	p {
		font-size: ${({ fontSize }) => fontSize}px;
		margin: unset;
		color: white;
	}
`;

let PrimaryLabel = styled(SingleLabel)`
	align-items: flex-end;
`;

let SecondaryLabel = styled(SingleLabel)`
	align-items: flex-start;
`;

export function Label({ x, y, w, h, primaryText, secondaryText, fontFamily, fontSize }: Props) {
	if (!secondaryText) {
		return (
			<Wrapper x={x} y={y} width={w} height={h}>
				<SingleLabel fontFamily={fontFamily} fontSize={fontSize}>
					<p>{primaryText}</p>
				</SingleLabel>
			</Wrapper>
		);
	}
	return (
		<>
			<Wrapper x={x} y={y} width={w} height={h / 2}>
				<PrimaryLabel fontFamily={fontFamily} fontSize={fontSize}>
					<p>{primaryText}</p>
				</PrimaryLabel>
			</Wrapper>
			<Wrapper x={x} y={y + h / 2} width={w} height={h / 2}>
				<SecondaryLabel fontFamily={fontFamily} fontSize={fontSize}>
					<p>{secondaryText}</p>
				</SecondaryLabel>
			</Wrapper>
		</>
	);
}
