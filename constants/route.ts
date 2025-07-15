const ROUTES = {
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	ASK_QUESTION: "/ask-question",
	COLLECTION: "/collection",
	Community: "/community",
	TAGS: "/tags",
	JOBS: "/jobs",
	QUESTION: (id: string) => `/question/${id}`,
	// QUESTION: (questionId: string) => `/question/${questionId}`,
	TAG: (id: string) => `/tags/${id}`,
	PROFILE: (userId: string) => `/profile/${userId}`,
	SIGN_IN_WITH_OAUTH: `signin-with-oauth`,
};

export default ROUTES;
