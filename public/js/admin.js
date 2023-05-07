console.log("form from js file", formComponents);

axios.get("/api/form-components").then((response) => {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);
debugger;
  Formio.icons = "fontawesome";
  Formio.createForm(document.getElementById("formio"), {
    components: response.data,
  }).then(function (form) {
    form.on("submit", function (submission) {
      console.log(submission);
    });
  });
});
