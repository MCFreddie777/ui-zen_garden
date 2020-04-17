const markdownpdf = require("markdown-pdf");

const options = {
	remarkable: {
		html: true,
		breaks: true,
	}
};

markdownpdf(options).from("./README.md").to("./doc/README.pdf", () => {
	console.log("Generated successfully")
});


