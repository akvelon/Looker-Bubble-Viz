import styled from "styled-components";

interface Props {
	transitionTiming?: number;
}

export let Circle = styled.circle<Props>`
	transition: ${({ transitionTiming = 0.5 }) => transitionTiming}s;
`;
