function previewFile() {
    const [file] = document.querySelector("input[type=file]").files;
    const reader = new FileReader();
    const parser = new DOMParser();

    reader.addEventListener(
        "load",
        () => {
            const htmlString = reader.result;
            const doc = parser.parseFromString(htmlString, "text/html");
            const matches = doc.querySelectorAll("td[colspan='2']");

            const elements = [];

            for (let index = 0; index < matches.length; index++) {
                let element = matches[index];
                element = element.textContent;
                element = element.replace("取得合計", "");
                element = element.replace("単位", "");
                element = element.trim();
                element = Number(element);

                elements.push(element);
            }

            const initialValue = 0;
            const sumWithInitial = elements.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue,
            );

            console.log(sumWithInitial);
            alert(`取得単位合計 ${sumWithInitial}`);
        },
        false,
    );

    if (file) {
        reader.readAsText(file);
    }
}
