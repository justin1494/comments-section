import React from "react";
import Comment from "./comment";
import styled from "styled-components";

function Reply({ reply, reference, data, currentUser, removeHandler, setIsModalOpen, setCommentId }) {
	return (
		<StyledReply>
			<div className="reply-section">
				<div className="line"></div>
				<Comment comment={reply} reference={reference} data={data} currentUser={currentUser} removeHandler={removeHandler} setIsModalOpen={setIsModalOpen} setCommentId={setCommentId}/>
			</div>
		</StyledReply>
	);
}

const StyledReply = styled.div`
	.reply-section {
		display: flex;
		/* flex-direction: column; */
		width: 700px;
		height: auto;
	}

	.line {
		width: 4px;
		height: auto;
		margin: 0 3rem;
		background-color: #e9eaee;
	}
	.box {
		width: 100px;
		height: auto;
		background-color: red;
		z-index: 100;
	}

	@media only screen and (max-width: 750px) {
		width: 100%;

		.reply-section {
			justify-content: flex-end;
			width: 100%;
		}

		.line {
			margin-right: 1.5rem;
			margin-left: 0.5rem;
			width: 0.2rem;
		}
	}
`;

export default Reply;
