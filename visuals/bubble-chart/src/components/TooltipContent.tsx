import React from "react";
import styled from "styled-components";

interface Props {
	primaryText?: string;
	secondaryText?: string;
	numericValue?: number;
	fontFamily: string;
}

let Wrapper = styled.div<Pick<Props, "fontFamily">>`
	font-family: ${({ fontFamily }) => fontFamily};
`;

export function TooltipContent({ primaryText, secondaryText, numericValue, fontFamily }: Props) {
	if (!primaryText && !secondaryText && !numericValue) {
		return (
			<Wrapper fontFamily={fontFamily}>
				<p>
					<b>No data for tooltip</b>
				</p>
				<p>Please assign either 'Size By', 'Primary Label', or 'Secondary Label'</p>
			</Wrapper>
		);
	}
	return (
		<Wrapper fontFamily={fontFamily}>
			{primaryText && <p>{primaryText}</p>}
			{secondaryText && <p>{secondaryText}</p>}
			{numericValue && (
				<p>
					<b>Size:</b> {numericValue}
				</p>
			)}
		</Wrapper>
	);
}
