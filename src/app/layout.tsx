import { ReactElement } from "react";

export default async function RootLayout({
	children
} : {children: ReactElement}) {

	return (
		<html>
			<body>
				{children}
			</body>
		</html>
	);
}