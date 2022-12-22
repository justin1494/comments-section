import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import Button from "./button";


function Input({currentUser, value, setCommentText, commentText, onClick, onKeyDown }) {
	const textareaRef = useRef(null);


	return (
		<StyledInput>
			<div className="user-info">
				<img className="avatar" src={require(`${currentUser?.image.png}`)} alt="" />
				<Button value={value} onClick={onClick}></Button>
			</div>
			<textarea
				ref={textareaRef}
				onChange={() => {
					setCommentText(textareaRef.current.value);
				}}
				type="textarea"
				value={commentText}
				placeholder="Write your comment..."
				onKeyDown={onKeyDown}
			/>
		</StyledInput>
	);
}

const StyledInput = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: auto;
	margin-bottom: 0.5rem;
	margin-top: 0.5rem;
	border-radius: 10px;
	padding: 1rem 2rem;
	background-color: white;

	.avatar {
		height: 2.5rem;
		margin-right: 1.5rem;
	}
	Button {
		position: absolute;
		right: 1rem;
		top: 1rem;
	}
	textarea {
		width: 73%;
		height: 5rem;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		resize: none;
		font-size: 1rem;
	}
	@media only screen and (max-width: 750px) {
		width: 100%;
		flex-direction: column-reverse;
		gap: 1rem;
		padding: 1rem;

		Button {
			position: relative;
			right: 0;
			top: 0;
		}
		textarea {
			width: 100%;
		}
		.user-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
`;

export default Input;
