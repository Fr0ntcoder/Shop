class Spinner {
    render() {
        let html = `
            <div class="spinner-block">
                <img src="components/Spinner/img/spinner.svg" >
            </div>
        `

        ROOT_SPINNER.innerHTML = html;
    }
}

const spinnerPage = new Spinner();

/* spinnerPage.render() */