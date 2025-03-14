function previewFile() {
    const [file] = document.querySelector("input[type=file]").files;
    const accept = "text/html";
    const size = 50 * 1024;
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            const htmlString = reader.result;
            const regex = /<td colspan="2">(.*?)<\/td>/g;
            const matches = htmlString.match(regex);

            const elements = [];

            for (let index = 0; index < matches.length; index++) {
                let element = matches[index];
                element = element.replace(/<\/?td[^>]*>/g, "");
                element = element.trim();
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

            alert(`取得単位合計 ${sumWithInitial}`);
            console.log(sumWithInitial);
        },
        false,
    );

    if (file && accept.includes(file.type) && file.size <= size) {
        reader.readAsText(file);
    }
}
