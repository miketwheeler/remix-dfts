import { useState, useEffect } from "react";

const useHeadingData = () => {
	const [nestedHeadings, setNestedHeadings] = useState([]);

	useEffect(() => {
		const headingElements = Array.from(
			document.querySelectorAll("h1, h2, h3, h4, h5, h6")
		);

		const newNestedHeadings = getNestedHeadings(headingElements);
		setNestedHeadings(newNestedHeadings);
	}, []);

	return { nestedHeadings };
};


const getNestedHeadings = (headingElements: any) => {
	const nestedHeadings = [] as any;

	headingElements.forEach((heading: any, index: any) => {
		const { innerText: title, id } = heading;

		if (heading.nodeName === "H2") {
			nestedHeadings.push({ id, title, items: [] });
		} else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
			nestedHeadings[nestedHeadings.length - 1].items.push({
				id,
				title,
			});
		}
	});

	return nestedHeadings;
};
