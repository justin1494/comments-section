import React, { useState, useRef } from "react";
import styled from "styled-components";
import Button from "./button";
import Input from "./input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
// fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faReply, faTrash } from "@fortawesome/free-solid-svg-icons";

function Comment({
	comment,
	data,
	currentUser,
	setIsModalOpen,
	setCommentId
}) {
	const increaseSign = useRef(null);
	const decreaseSign = useRef(null);
	const docRef = doc(db, "data", "users");

	const [replyVisibility, setReplyVisibility] = useState(false);
	const [editVisibility, setEditVisibility] = useState(false);
	const [replyText, setReplyText] = useState();

	const updateTextRef = useRef(null);

	const newReply = {
		content: replyText,
		createdAt: "today",
		id: uuidv4(),
		replyingTo: comment.user.username,
		score: 0,
		user: currentUser,
	};

	const changeScore = (buttonId, change) => {
		const conditionalLogic = (comment) => {
			if (comment.id.toString() === buttonId) {
				if (comment.score === 0 && change === "decrease") {
					return (comment.score = 0);
				}
				if (change === "increase") {
					comment.score++;
				} else if (change === "decrease") {
					comment.score--;
				}
				updateDoc(docRef, data);
			}
		};
		data.comments.forEach((comment) => {
			conditionalLogic(comment);
			comment.replies.forEach((reply) => {
				conditionalLogic(reply);
			});
		});
	};

	const increaseScore = () => {
		changeScore(increaseSign.current.dataset.id, "increase");
	};

	const decreaseScore = () => {
		changeScore(increaseSign.current.dataset.id, "decrease");
	};

	const postReply = (id) => {
		data.comments.forEach((comment) => {
			if (comment.id === id) {
				comment.replies.push(newReply);
				setReplyVisibility(false);
				updateDoc(docRef, data);
			}
			comment.replies.forEach((reply) => {
				if (reply.id === id) {
					comment.replies.push(newReply);
					setReplyVisibility(false);
					updateDoc(docRef, data);
				}
			});
		});
	};

	const updateComment = (id) => {
		data.comments.forEach((comment) => {
			if (comment.id === id) {
				comment.content = updateTextRef.current.value;
				setEditVisibility(false);
				updateDoc(docRef, data);
			}
			comment.replies.forEach((reply) => {
				if (reply.id === id) {
					reply.content = updateTextRef.current.value;
					setEditVisibility(false);
					updateDoc(docRef, data);
				}
			});
		});
	};

	return (
		<StyledComment>
			<div className="inner">
				<div className="comment-box">
					<div className="rating">
						<button
							className="rating-icon plus"
							onClick={increaseScore}
							data-id={comment.id}
							ref={increaseSign}>
							<svg
								width="11"
								height="11"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
									fill="#C5C6EF"
								/>
							</svg>
						</button>
						<div className="score">{comment.score}</div>
						<button
							className="rating-icon minus"
							onClick={decreaseScore}
							data-id={comment.id}
							ref={decreaseSign}>
							<svg
								width="11"
								height="3"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
									fill="#C5C6EF"
								/>
							</svg>
						</button>
					</div>
					<div className="info">
						<div className="heading">
							<img
								src={require(`${comment.user.image.png}`)}
								className="avatar"
								alt=""
							/>
							<div className="username">
								{comment.user.username}
								{comment.user.username ===
									data.currentUser.username && (
									<span className="you-tag">you</span>
								)}
							</div>
							<div className="created-at">
								{comment.createdAt}
							</div>
							{comment.user.username ===
							data.currentUser.username ? (
								<>
									<button
										className="delete"
										data-id={comment.id}
										onClick={() => {
											setIsModalOpen(true);
											setCommentId(comment.id);
										}}>
										<FontAwesomeIcon
											icon={faTrash}
											className="icon"
										/>
										Delete
									</button>
									<button
										className="edit"
										data-id={comment.id}
										onClick={() => {
											setEditVisibility(!editVisibility);
										}}>
										<FontAwesomeIcon
											icon={faPen}
											className="icon"
										/>
										Edit
									</button>
								</>
							) : (
								<button
									className="reply"
									data-id={comment.id}
									onClick={() => {
										setReplyVisibility(!replyVisibility);
									}}>
									<FontAwesomeIcon
										icon={faReply}
										className="icon"
									/>
									Reply
								</button>
							)}
						</div>
						<div className="content">
							{editVisibility === true ? (
								<>
									<textarea
										ref={updateTextRef}
										defaultValue={comment.content}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												updateComment(comment.id);
											}
										}}></textarea>
									<div className="button-style">
										<Button
											value="UPDATE"
											onClick={() => {
												updateComment(comment.id);
											}}
										/>
									</div>
								</>
							) : (
								<>
									{comment.replyingTo !== undefined && (
										<span className="reference">
											@{comment.replyingTo + " "}
										</span>
									)}
									{comment.content}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<div>
				{replyVisibility === true && (
					<Input
						commentText={replyText}
						setCommentText={setReplyText}
						value={"REPLY"}
						currentUser={currentUser}
						onClick={() => {
							postReply(comment.id);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								postReply(comment.id);
							}
						}}
					/>
				)}
			</div>
		</StyledComment>
	);
}

const StyledComment = styled.div`
	width: 700px;

	.inner {
		position: relative;
		height: auto;
		margin-bottom: 0.5rem;
		margin-top: 0.5rem;
		border-radius: 10px;
		background-color: white;
	}

	.comment-box {
		display: flex;
		width: 116%;
		padding: 1rem 2rem;
	}
	.rating {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		border-radius: 6px;
		height: 100px;
		width: 40px;
		background-color: #f5f4fa;
	}
	.rating > * {
		height: 25px;
	}
	.info {
		width: 80%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-left: 1.5rem;
	}
	.rating-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
		border: none;
		background-color: transparent;
		cursor: pointer;
		:hover {
			svg path {
				fill: #7676b3;
			}
		}
	}
	.score {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		color: #7676b3;
	}
	.heading {
		width: 100%;
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 1rem;
	}
	.avatar {
		height: 2rem;
	}
	.created-at {
		color: #80838a;
	}

	.reply,
	.edit,
	.delete {
		position: absolute;
		right: 1.5rem;
		top: 1rem;
		border: none;
		background-color: transparent;
		padding: 0.5rem;
		color: #5356b6;
		font-weight: 500;
		font-size: 1rem;
		:hover {
			color: #7676b3;
			cursor: pointer;
		}

		.icon {
			margin-right: 0.3rem;
			font-size: smaller;
		}
	}

	.delete {
		right: 6rem;
		color: #cc6469;
		:hover {
			color: #fbb7ba;
		}
	}
	.content {
		gap: 1rem;
		margin: 1rem 0;
		width: 100%;

		textarea {
			width: 100%;
			height: 8rem;
			border-radius: 0.5rem;
			padding: 0.5rem 1rem;
			resize: none;
			font-size: 1rem;
		}
	}

	.button-style {
		width: 100%;
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
	}

	.reference {
		color: #5357b9;
		font-weight: bold;
	}

	.you-tag {
		margin-left: 0.5rem;
		padding: 0 0.5rem;
		padding-bottom: 0.3rem;
		padding-top: 0.2rem;
		font-size: smaller;
		border-radius: 0.5rem;
		background-color: #4c54b1;
		color: white;
	}
	@media only screen and (max-width: 750px) {
		width: 100%;

		.inner {
			width: 100%;
		}

		.comment-box {
			width: 95%;
			flex-direction: column-reverse;
			padding: 1rem 1rem;
		}

		.rating {
			flex-direction: row;
			height: 40px;
			width: 100px;
		}

		.reply,
		.edit,
		.delete {
			top: unset;
			height: 3rem;
			bottom: 0.75rem;
		}

		.info {
			width: 100%;
			padding: 0;
			margin: 0.5rem 0;
		}
	}
`;

export default Comment;
