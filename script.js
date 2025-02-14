$(document).ready(function () {
    $("#generarRFC").click(function () {
        let nombre = $("#nombre").val().trim().toUpperCase();
        let apellidoPaterno = $("#apellidoPaterno").val().trim().toUpperCase();
        let apellidoMaterno = $("#apellidoMaterno").val().trim().toUpperCase();
        let fechaNacimiento = $("#fechaNacimiento").val();

        if (nombre === "" || apellidoPaterno === "" || fechaNacimiento === "") {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        let rfc = generarRFC(apellidoPaterno, apellidoMaterno, nombre, fechaNacimiento);
        $("#resultadoRFC").val(rfc);
    });

    function generarRFC(apellidoPaterno, apellidoMaterno, nombre, fechaNacimiento) {
        let primeraLetra = apellidoPaterno.charAt(0);
        let primeraVocal = apellidoPaterno.match(/[AEIOU]/i);
        primeraVocal = primeraVocal ? primeraVocal[0] : "";
        let primeraLetraMaterno = apellidoMaterno ? apellidoMaterno.charAt(0) : "";
        let primeraLetraNombre = nombre.charAt(0);

        let fecha = fechaNacimiento.split("-");
        let anio = fecha[0].substr(2, 2);
        let mes = fecha[1];
        let dia = fecha[2];

        let rfcBase = (primeraLetra + primeraVocal + primeraLetraMaterno + primeraLetraNombre + anio + mes + dia).toUpperCase();
        let homoclave = generarHomoclave(); 

        return rfcBase + homoclave;
    }

    function generarHomoclave() {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let homoclave = "";
        for (let i = 0; i < 3; i++) {
            homoclave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return homoclave;
    }

    $("#consultarAPI").click(function () {
        let apiId = $("#apiId").val().trim();

        if (apiId === "" || isNaN(apiId)) {
            alert("Por favor, ingrese un ID válido.");
            return;
        }

        $.ajax({
            url: `https://jsonplaceholder.typicode.com/users/${apiId}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                $("#apiNombre").val(data.name);
                $("#apiEmail").val(data.email);
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un problema al consultar la API. Revisa la consola para más detalles.");
            }
        });
    });

    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false, anim: { enable: false } },
            size: { value: 3, random: true, anim: { enable: false } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
});
