import React from "react";
import styled from "styled-components";

function Modal({ setConfirmation, setIsModalOpen }) {
	return (
		<StyledModal>
			<div className="modal">
				<h2 className="title">Delete comment</h2>
				<p className="modal-text">
					Are you sure you want to delete this comment? This willl
					remove the comment and can't be undone.
				</p>
				<div className="buttons">
					<button
						className="cancel"
						onClick={() => {
							setIsModalOpen(false);
						}}>
						NO, CANCEL
					</button>
					<button
						className="confirm"
						onClick={() => {
							setConfirmation(true);
						}}>
						YES, DELETE
					</button>
				</div>
			</div>
		</StyledModal>
	);
}

const StyledModal = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 10;

	.modal {
		width: 360px;
		height: 250px;
		padding: 1.5rem;
		background-color: white;
		border-radius: 0.5rem;
	}

	h2 {
		font-weight: 500;
	}

	p {
		margin-bottom: 1.5rem;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;

		button {
			width: 140px;
			height: 45px;
			border-radius: 0.5rem;
			border: none;
			color: white;
			font-weight: 500;
			cursor: pointer;
		}
		.cancel {
			background-color: #68717e;
		}
		.confirm {
			background-color: #ee6368;
		}
	}
`;

export default Modal;
