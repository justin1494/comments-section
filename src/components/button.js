import React from "react";
import styled from "styled-components";



function Button({value, onClick}) {
	return (
		<StyledButton onClick={onClick}>{value}</StyledButton>
	);
}

const StyledButton = styled.button`
	width: 5.5rem;
	height: 2.5rem;
	border: none;
	border-radius: 0.5rem;
	font-weight: 400;
	font-size: 1rem;
	background-color: #5356b6;
	color: white;
	cursor: pointer;

	:hover {
		background-color: #c4c6ef;
	}

`;

export default Button;
