import "./App.css";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import Comment from "./components/comment";
import Reply from "./components/reply";
import Input from "./components/input";
import Modal from "./components/modal";
import { v4 as uuidv4 } from "uuid";

function App() {
	const [data, setData] = useState();
	const [commentText, setCommentText] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [commentId, setCommentId] = useState();

	const doFetch = async () => {
		onSnapshot(doc(db, "data", "users"), (doc) => {
			setData(doc.data());
		});
	};

	useEffect(() => {
		doFetch();
	}, []);

	const currentUser = data?.currentUser;
	const comments = data?.comments;

	const docRef = doc(db, "data", "users");

	const newComment = {
		content: commentText,
		createdAt: "today",
		id: uuidv4(),
		replies: [],
		score: 0,
		user: currentUser,
	};

	const addComment = () => {
		data.comments.push(newComment);
		setCommentText("");
		updateDoc(docRef, data);
	};

	const removeHandler = (id) => {
		data.comments.forEach((comment) => {
			if (comment.id.toString() === id) {
				data.comments = data.comments.filter(
					(comment) => comment.id !== id
				);
			}
			comment.replies.forEach((reply) => {
				if (reply.id === id) {
					comment.replies = comment.replies.filter(
						(reply) => reply.id !== id
					);
				}
			});
			updateDoc(docRef, data);
		});
	};

	return (
		<StyledApp>
			{isModalOpen && (
				<Modal
					setIsModalOpen={setIsModalOpen}
					removeHandler={removeHandler}
					commentId={commentId}
				/>
			)}
			{data === undefined ? (
				<p>Loading..</p>
			) : (
				<div className="wrapper">
					{comments.map((comment) => (
						<div className="inner-wrapper" key={uuidv4()}>
							<Comment
								comment={comment}
								data={data}
								currentUser={currentUser}
								setIsModalOpen={setIsModalOpen}
								setCommentId={setCommentId}
								key={uuidv4()}
							/>
							{comment.replies.map((reply) => (
								<Reply
									reply={reply}
									data={data}
									currentUser={currentUser}
									setIsModalOpen={setIsModalOpen}
									removeHandler={removeHandler}
									setCommentId={setCommentId}
									key={uuidv4()}
								/>
							))}
						</div>
					))}
					<Input
						currentUser={currentUser}
						data={data}
						value={"SEND"}
						commentText={commentText}
						setCommentText={setCommentText}
						onClick={addComment}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								addComment();
							}
						}}
					/>
				</div>
			)}
		</StyledApp>
	);
}

const StyledApp = styled.div`
	/* margin-top: 2rem; */

	.wrapper {
		width: 700px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	@media only screen and (max-width: 750px) {
		.wrapper {
			width: 90vw;
		}
		.inner-wrapper {
			width: 90vw;
		}
	}
`;

export default App;
